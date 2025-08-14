console.log('Telnyx Expander content script loaded!');
console.log('Current URL:', window.location.href);
console.log('Document ready state:', document.readyState);

let templates = {};
let currentInput = '';
let lastElement = null;

function loadCurrentGroupTemplates() {
  console.log('🔄 Loading templates...');
  chrome.storage.local.get(['snippetGroups', 'currentGroup'], function(result) {
    console.log('📦 Storage result:', result);
    const snippetGroups = result.snippetGroups || {};
    const currentGroup = result.currentGroup || 'my-snippets';
    
    // Load templates only from the currently selected group
    templates = snippetGroups[currentGroup] || {};
    
    console.log('Templates loaded from group "' + currentGroup + '":', Object.keys(templates).length);
    console.log('📋 Available templates:', Object.keys(templates));
  });
}

loadCurrentGroupTemplates();

chrome.storage.onChanged.addListener(function(changes, namespace) {
  if (namespace === 'local') {
    // Reload if either snippet groups or current group changes
    if (changes.snippetGroups || changes.currentGroup) {
      loadCurrentGroupTemplates();
    }
  }
});

function insertText(element, text) {
  if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
    const start = element.selectionStart;
    const end = element.selectionEnd;
    const value = element.value;
    
    const beforeTrigger = value.substring(0, start - currentInput.length);
    const afterCursor = value.substring(end);
    
    element.value = beforeTrigger + text + afterCursor;
    element.selectionStart = element.selectionEnd = beforeTrigger.length + text.length;
    
    // Trigger multiple events for better compatibility
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
    element.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true }));
    
  } else if (element.isContentEditable || isEditableElement(element)) {
    try {
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        
        // Enhanced text replacement for rich text editors
        if (range.startContainer.nodeType === Node.TEXT_NODE) {
          const textNode = range.startContainer;
          const offset = range.startOffset;
          
          // Replace the trigger with expansion text
          const beforeTrigger = textNode.textContent.substring(0, offset - currentInput.length);
          const afterTrigger = textNode.textContent.substring(offset);
          
          textNode.textContent = beforeTrigger + text + afterTrigger;
          
          // Set cursor position after the inserted text
          const newRange = document.createRange();
          newRange.setStart(textNode, beforeTrigger.length + text.length);
          newRange.collapse(true);
          selection.removeAllRanges();
          selection.addRange(newRange);
        } else {
          // Fallback for complex DOM structures
          range.setStart(range.startContainer, Math.max(0, range.startOffset - currentInput.length));
          range.deleteContents();
          
          const textNode = document.createTextNode(text);
          range.insertNode(textNode);
          range.setStartAfter(textNode);
          range.setEndAfter(textNode);
          selection.removeAllRanges();
          selection.addRange(range);
        }
        
        // Trigger events for rich text editors
        element.dispatchEvent(new Event('input', { bubbles: true }));
        element.dispatchEvent(new Event('keyup', { bubbles: true }));
        element.dispatchEvent(new Event('change', { bubbles: true }));
        
        // Additional events for Gmail and other complex editors
        element.dispatchEvent(new CustomEvent('textInput', { bubbles: true, detail: text }));
        
      }
    } catch (error) {
      console.log('Error inserting text in contentEditable:', error);
      // Fallback: Try inserting at cursor position
      try {
        document.execCommand('insertText', false, text);
      } catch (fallbackError) {
        console.log('Fallback insertion also failed:', fallbackError);
      }
    }
  }
}

function isEditableElement(element) {
  // Check for various types of editable elements used by modern web apps
  if (element.isContentEditable) return true;
  if (element.getAttribute && element.getAttribute('contenteditable') === 'true') return true;
  if (element.getAttribute && element.getAttribute('role') === 'textbox') return true;
  if (element.classList && element.classList.contains('editable')) return true;
  
  // Check for specific Gmail/web editor classes
  const editableClasses = [
    'gmail-compose-body',
    'editable',
    'compose-text',
    'zen-editor',
    'rich-text-editor',
    'ql-editor', // Quill editor
    'ace_text-input', // Ace editor
    'CodeMirror', // CodeMirror
    'mce-content-body', // TinyMCE
    'editor',
    'DraftEditor-editorContainer',
    'DraftEditor-root',
    'notranslate',
    'ember-text-area'
  ];
  
  // Check for class-based detection
  if (editableClasses.some(className => 
    element.classList && element.classList.contains(className)
  )) {
    return true;
  }
  
  // Check if element is within an editor container
  let parent = element;
  while (parent && parent !== document.body) {
    if (parent.classList) {
      if (parent.classList.contains('editor') || 
          parent.classList.contains('compose-text') ||
          parent.classList.contains('rich-text-editor')) {
        return true;
      }
    }
    parent = parent.parentElement;
  }
  
  return false;
}

function playExpansionSound() {
  try {
    // Create audio element and play the MP3 sound
    const audio = new Audio(chrome.runtime.getURL('Sound.mp3'));
    audio.volume = 0.7; // Set volume to 70%
    audio.preload = 'auto'; // Preload the audio for faster playback
    
    console.log('🔊 Attempting to play expansion sound from:', chrome.runtime.getURL('Sound.mp3'));
    
    // Add event listeners for better debugging
    audio.addEventListener('loadstart', () => {
      console.log('🔊 Sound loading started');
    });
    
    audio.addEventListener('canplay', () => {
      console.log('🔊 Sound can play');
    });
    
    audio.addEventListener('loadeddata', () => {
      console.log('🔊 Sound data loaded');
    });
    
    audio.addEventListener('error', (e) => {
      console.log('🔊 Sound loading error:', e);
      console.log('🔊 Audio error details:', audio.error);
    });
    
    audio.play().then(() => {
      console.log('🔊 Sound played successfully');
    }).catch(error => {
      console.log('🔊 Could not play expansion sound:', error);
      // Try alternative approach with a fresh audio instance
      const fallbackAudio = new Audio();
      fallbackAudio.src = chrome.runtime.getURL('Sound.mp3');
      fallbackAudio.volume = 0.7;
      fallbackAudio.play().catch(fallbackError => {
        console.log('🔊 Fallback sound also failed:', fallbackError);
      });
    });
  } catch (error) {
    console.log('🔊 Audio feedback not available:', error);
  }
}

function checkForExpansion(element, inputChar) {
  currentInput += inputChar;
  
  console.log('Current input:', currentInput, 'Char:', inputChar);
  
  if (currentInput.length > 50) {
    currentInput = currentInput.slice(-50);
  }
  
  for (const [trigger, expansion] of Object.entries(templates)) {
    if (trigger && currentInput.endsWith(trigger)) {
      console.log('🎉 EXPANDING TRIGGER:', trigger, '→', expansion.substring(0, 50) + '...');
      insertText(element, expansion);
      currentInput = '';
      
      // Play feedback sound
      playExpansionSound();
      
      // Save as last used trigger
      chrome.storage.local.set({ lastUsedTrigger: trigger });
      break;
    }
  }
}

// Main input event handler
document.addEventListener('input', function(e) {
  const element = e.target;
  console.log('🎯 Input event detected:', {
    tagName: element.tagName,
    className: element.className,
    inputType: e.inputType,
    data: e.data
  });
  
  // Enhanced element detection for modern web apps
  if (isValidInputElement(element)) {
    console.log('✅ Element is valid for text expansion');
    if (element !== lastElement) {
      currentInput = '';
      lastElement = element;
      console.log('🔄 Switched to new element:', element.tagName, element.className);
    }
    
    const inputType = e.inputType;
    console.log('✅ VALID INPUT EVENT:', inputType, 'Data:', e.data, 'Element:', element.tagName);
    
    if (inputType === 'insertText' || inputType === 'insertCompositionText') {
      if (e.data) {
        console.log('📝 Calling checkForExpansion with char:', e.data);
        checkForExpansion(element, e.data);
      }
    } else if (inputType === 'deleteContentBackward' || inputType === 'deleteContentForward') {
      currentInput = '';
      console.log('🔙 Cleared currentInput due to delete');
    } else {
      // Enhanced fallback for complex editors
      setTimeout(() => {
        const newValue = getElementText(element);
        const lastChar = newValue.slice(-1);
        if (lastChar && lastChar !== ' ' && lastChar !== '\n' && lastChar !== '\t') {
          console.log('⏰ Fallback: calling checkForExpansion with char:', lastChar);
          checkForExpansion(element, lastChar);
        }
      }, 10);
    }
  }
});

function isValidInputElement(element) {
  // Standard form elements
  if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') return true;
  
  // ContentEditable elements
  if (element.isContentEditable) return true;
  
  // Enhanced element detection for modern editors
  if (isEditableElement(element)) return true;
  
  // Check parent elements for contentEditable (for nested structures)
  let parent = element.parentElement;
  while (parent && parent !== document.body) {
    if (parent.isContentEditable || isEditableElement(parent)) {
      return true;
    }
    parent = parent.parentElement;
  }
  
  return false;
}

function getElementText(element) {
  // Get text content from various element types
  if (element.value !== undefined) {
    return element.value; // INPUT/TEXTAREA
  } else if (element.textContent !== undefined) {
    return element.textContent; // ContentEditable
  } else if (element.innerText !== undefined) {
    return element.innerText; // Fallback
  }
  return '';
}

document.addEventListener('keydown', function(e) {
  const element = e.target;
  
  if (isValidInputElement(element)) {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      currentInput = '';
    }
  }
});

document.addEventListener('click', function(e) {
  currentInput = '';
});