document.addEventListener('DOMContentLoaded', function() {
  const triggerInput = document.getElementById('trigger');
  const expansionInput = document.getElementById('expansion');
  const addBtn = document.getElementById('add-btn');
  const cancelBtn = document.getElementById('cancel-btn');
  const formTitle = document.getElementById('form-title');
  const templatesContainer = document.getElementById('templates-container');
  const snippetGroupSelect = document.getElementById('snippet-group-select');
  const viewLastBtn = document.getElementById('view-last-btn');
  const editLastBtn = document.getElementById('edit-last-btn');
  const expandBtn = document.getElementById('expand-btn');
  const collapseBtn = document.getElementById('collapse-btn');
  const templatesList = document.querySelector('.templates-list');
  const importBtn = document.getElementById('import-btn');
  const exportBtn = document.getElementById('export-btn');
  const fileInput = document.getElementById('file-input');
  const addToGroupSelect = document.getElementById('add-to-group-select');
  const newGroupNameContainer = document.getElementById('new-group-name-container');
  const newGroupNameInput = document.getElementById('new-group-name');
  const renameGroupBtn = document.getElementById('rename-group-btn');
  const deleteGroupBtn = document.getElementById('delete-group-btn');
  const searchTemplatesInput = document.getElementById('search-templates');
  const searchSection = document.querySelector('.search-section');
  
  let editingTrigger = null;
  let lastUsedTrigger = null;
  let currentGroup = 'my-snippets';
  let allTemplates = {}; // Store all templates for search functionality
  
  console.log('Popup script loaded');
  
  function loadTemplates() {
    console.log('Loading templates for group:', currentGroup);
    chrome.storage.local.get(['snippetGroups', 'lastUsedTrigger', 'currentGroup'], function(result) {
      console.log('Storage result:', result);
      
      const snippetGroups = result.snippetGroups || {};
      const groups = Object.keys(snippetGroups);
      
      // Use saved current group if available and it exists
      if (result.currentGroup && snippetGroups[result.currentGroup]) {
        currentGroup = result.currentGroup;
        console.log('Loaded saved current group:', currentGroup);
      } else if (groups.length > 0) {
        // If saved group doesn't exist, use the first available group
        currentGroup = groups[0];
        console.log('Saved group not found, using first available group:', currentGroup);
      } else {
        // If no groups exist, create default group
        currentGroup = 'my-snippets';
        snippetGroups[currentGroup] = {};
        console.log('No groups found, created default group:', currentGroup);
      }
      
      const templates = snippetGroups[currentGroup] || {};
      allTemplates = templates; // Store for search functionality
      lastUsedTrigger = result.lastUsedTrigger || null;
      
      console.log('Templates found:', Object.keys(templates).length);
      
      // Clear search when switching groups
      searchTemplatesInput.value = '';
      displayTemplates(templates);
      updateLastSnippetButtons();
      updateDropdown(snippetGroups);
      updateAddToGroupDropdown(snippetGroups);
      
      // Save the current group to storage to maintain selection
      chrome.storage.local.set({ currentGroup: currentGroup });
    });
  }
  
  function updateDropdown(snippetGroups) {
    snippetGroupSelect.innerHTML = '';
    
    const groups = Object.keys(snippetGroups);
    if (groups.length === 0) {
      groups.push('my-snippets');
    }
    
    // Validate that currentGroup exists in available groups
    if (!groups.includes(currentGroup)) {
      currentGroup = groups[0];
    }
    
    groups.forEach(groupName => {
      const option = document.createElement('option');
      option.value = groupName;
      option.textContent = groupName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      if (groupName === currentGroup) {
        option.selected = true;
      }
      snippetGroupSelect.appendChild(option);
    });
    
    // Disable both rename and delete buttons if only one group exists
    renameGroupBtn.disabled = groups.length <= 1;
    deleteGroupBtn.disabled = groups.length <= 1;
  }
  
  function updateAddToGroupDropdown(snippetGroups) {
    addToGroupSelect.innerHTML = '';
    
    const groups = Object.keys(snippetGroups);
    if (groups.length === 0) {
      groups.push('my-snippets');
    }
    
    groups.forEach(groupName => {
      const option = document.createElement('option');
      option.value = groupName;
      option.textContent = groupName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      if (groupName === currentGroup) {
        option.selected = true;
      }
      addToGroupSelect.appendChild(option);
    });
    
    // Add "Add New" option
    const addNewOption = document.createElement('option');
    addNewOption.value = 'add-new';
    addNewOption.textContent = 'Add New...';
    addToGroupSelect.appendChild(addNewOption);
  }
  
  function updateLastSnippetButtons() {
    const hasLastSnippet = lastUsedTrigger !== null;
    viewLastBtn.disabled = !hasLastSnippet;
    editLastBtn.disabled = !hasLastSnippet;
    
    if (!hasLastSnippet) {
      viewLastBtn.style.opacity = '0.5';
      editLastBtn.style.opacity = '0.5';
    } else {
      viewLastBtn.style.opacity = '1';
      editLastBtn.style.opacity = '1';
    }
  }
  
  function searchTemplates(searchTerm) {
    if (!searchTerm.trim()) {
      // If search is empty, show all templates
      return allTemplates;
    }
    
    const filteredTemplates = {};
    const searchLower = searchTerm.toLowerCase();
    
    // Search in both triggers and expansions
    for (const [trigger, expansion] of Object.entries(allTemplates)) {
      if (trigger.toLowerCase().includes(searchLower) || 
          expansion.toLowerCase().includes(searchLower)) {
        filteredTemplates[trigger] = expansion;
      }
    }
    
    return filteredTemplates;
  }
  
  function displayTemplates(templates) {
    console.log('Displaying templates:', templates);
    templatesContainer.innerHTML = '';
    
    if (Object.keys(templates).length === 0) {
      templatesContainer.innerHTML = '<div class="no-templates">No templates saved yet.</div>';
      return;
    }
    
    for (const [trigger, expansion] of Object.entries(templates)) {
      const templateDiv = document.createElement('div');
      templateDiv.className = 'template-item';
      
      templateDiv.innerHTML = `
        <div class="template-info">
          <div class="trigger">${escapeHtml(trigger)}</div>
          <div class="expansion">${escapeHtml(expansion)}</div>
        </div>
        <div class="template-actions">
          <button class="edit-btn" data-trigger="${escapeHtml(trigger)}">✏</button>
          <button class="delete-btn" data-trigger="${escapeHtml(trigger)}">×</button>
        </div>
      `;
      
      templatesContainer.appendChild(templateDiv);
    }
    
    // Add event listeners
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const trigger = this.getAttribute('data-trigger');
        deleteTemplate(trigger);
      });
    });
    
    document.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const trigger = this.getAttribute('data-trigger');
        editTemplate(trigger);
      });
    });
    
    document.querySelectorAll('.template-item').forEach(item => {
      item.addEventListener('click', function(e) {
        if (e.target.classList.contains('edit-btn') || e.target.classList.contains('delete-btn')) {
          return;
        }
        const trigger = item.querySelector('.edit-btn').getAttribute('data-trigger');
        editTemplate(trigger);
      });
    });
  }
  
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
  
  function addTemplate() {
    const trigger = triggerInput.value.trim();
    const expansion = expansionInput.value.trim();
    let targetGroup = addToGroupSelect.value;
    
    if (!trigger || !expansion) {
      alert('Please fill in both trigger and expansion fields.');
      return;
    }
    
    // Handle new group creation
    if (targetGroup === 'add-new') {
      const newGroupName = newGroupNameInput.value.trim();
      if (!newGroupName) {
        alert('Please enter a name for the new group.');
        return;
      }
      // Convert to slug format
      targetGroup = newGroupName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    }
    
    chrome.storage.local.get(['snippetGroups'], function(result) {
      const snippetGroups = result.snippetGroups || {};
      if (!snippetGroups[targetGroup]) {
        snippetGroups[targetGroup] = {};
      }
      
      // If editing, remove the old trigger from the original group
      if (editingTrigger && editingTrigger !== trigger) {
        delete snippetGroups[currentGroup][editingTrigger];
      }
      
      snippetGroups[targetGroup][trigger] = expansion;
      
      chrome.storage.local.set({ 
        snippetGroups: snippetGroups,
        lastUsedTrigger: trigger,
        currentGroup: targetGroup  // Switch to the new group if created
      }, function() {
        // Update current group if we created a new one
        if (addToGroupSelect.value === 'add-new') {
          currentGroup = targetGroup;
        }
        resetForm();
        loadTemplates();
      });
    });
  }
  
  function editTemplate(trigger) {
    chrome.storage.local.get(['snippetGroups'], function(result) {
      const snippetGroups = result.snippetGroups || {};
      const templates = snippetGroups[currentGroup] || {};
      const expansion = templates[trigger];
      
      if (expansion) {
        editingTrigger = trigger;
        triggerInput.value = trigger;
        expansionInput.value = expansion;
        formTitle.textContent = 'Edit Template';
        addBtn.textContent = 'Update Template';
        cancelBtn.style.display = 'block';
        triggerInput.focus();
      }
    });
  }
  
  function resetForm() {
    editingTrigger = null;
    triggerInput.value = '';
    expansionInput.value = '';
    newGroupNameInput.value = '';
    newGroupNameContainer.style.display = 'none';
    addToGroupSelect.value = currentGroup; // Reset to current group
    formTitle.textContent = 'Add New Template';
    addBtn.textContent = 'Add Template';
    cancelBtn.style.display = 'none';
  }
  
  function deleteTemplate(trigger) {
    if (confirm(`Delete template "${trigger}"?`)) {
      chrome.storage.local.get(['snippetGroups'], function(result) {
        const snippetGroups = result.snippetGroups || {};
        if (snippetGroups[currentGroup]) {
          delete snippetGroups[currentGroup][trigger];
        }
        
        chrome.storage.local.set({ snippetGroups: snippetGroups }, function() {
          loadTemplates();
        });
      });
    }
  }
  
  function renameSnippetGroup() {
    chrome.storage.local.get(['snippetGroups'], function(result) {
      const snippetGroups = result.snippetGroups || {};
      const allGroups = Object.keys(snippetGroups);
      
      // Get current group display name
      const currentGroupDisplayName = currentGroup.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      
      // Ask for new name
      const newDisplayName = prompt(`Rename snippet group "${currentGroupDisplayName}" to:`, currentGroupDisplayName);
      
      if (!newDisplayName) {
        return; // User cancelled
      }
      
      if (newDisplayName.trim() === '') {
        alert('Please enter a valid group name.');
        return;
      }
      
      // Convert to slug format
      const newGroupName = newDisplayName.toLowerCase().replace(/[^a-z0-9]/g, '-');
      
      // Check if new name already exists (and is different from current)
      if (newGroupName !== currentGroup && snippetGroups[newGroupName]) {
        alert(`A snippet group named "${newDisplayName}" already exists. Please choose a different name.`);
        return;
      }
      
      // If name is the same, no need to do anything
      if (newGroupName === currentGroup) {
        return;
      }
      
      // Copy all snippets from old group to new group
      const templatesCount = snippetGroups[currentGroup] ? Object.keys(snippetGroups[currentGroup]).length : 0;
      snippetGroups[newGroupName] = { ...snippetGroups[currentGroup] };
      
      // Delete the old group
      delete snippetGroups[currentGroup];
      
      // Update current group reference
      currentGroup = newGroupName;
      
      chrome.storage.local.set({ 
        snippetGroups: snippetGroups,
        currentGroup: currentGroup 
      }, function() {
        loadTemplates();
        alert(`Snippet group renamed to "${newDisplayName}" with ${templatesCount} snippets.`);
      });
    });
  }
  
  function deleteSnippetGroup() {
    chrome.storage.local.get(['snippetGroups'], function(result) {
      const snippetGroups = result.snippetGroups || {};
      const allGroups = Object.keys(snippetGroups);
      
      // Prevent deletion if it's the only group
      if (allGroups.length <= 1) {
        alert('Cannot delete the last snippet group. You must have at least one group.');
        return;
      }
      
      const groupDisplayName = currentGroup.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      const templatesCount = snippetGroups[currentGroup] ? Object.keys(snippetGroups[currentGroup]).length : 0;
      
      const confirmMessage = templatesCount > 0 
        ? `Are you sure you want to delete the snippet group "${groupDisplayName}" and its ${templatesCount} templates?\n\nThis action cannot be undone.`
        : `Are you sure you want to delete the snippet group "${groupDisplayName}"?\n\nThis action cannot be undone.`;
      
      if (confirm(confirmMessage)) {
        // Delete the current group
        delete snippetGroups[currentGroup];
        
        // Switch to the first remaining group
        const remainingGroups = Object.keys(snippetGroups);
        if (remainingGroups.length > 0) {
          currentGroup = remainingGroups[0];
        } else {
          // If no groups remain, create the default group
          currentGroup = 'my-snippets';
          snippetGroups[currentGroup] = {};
        }
        
        chrome.storage.local.set({ 
          snippetGroups: snippetGroups,
          currentGroup: currentGroup 
        }, function() {
          loadTemplates();
          alert(`Snippet group "${groupDisplayName}" has been deleted.`);
        });
      }
    });
  }
  
  function importSnippets() {
    console.log('Import button clicked');
    fileInput.click();
  }
  
  function exportSnippets() {
    console.log('Export button clicked');
    chrome.storage.local.get(['snippetGroups'], function(result) {
      const snippetGroups = result.snippetGroups || {};
      const templates = snippetGroups[currentGroup] || {};
      
      if (Object.keys(templates).length === 0) {
        alert('No snippets to export in the selected group.');
        return;
      }
      
      // Convert to CSV format
      let csvContent = '';
      for (const [trigger, expansion] of Object.entries(templates)) {
        const escapedTrigger = `"${trigger.replace(/"/g, '""')}"`;
        const escapedExpansion = `"${expansion.replace(/"/g, '""')}"`;
        csvContent += `${escapedTrigger},${escapedExpansion},\n`;
      }
      
      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      const fileName = `${currentGroup}-snippets-${new Date().toISOString().slice(0,10)}.csv`;
      link.setAttribute('download', fileName);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
  
  function parseCSV(text) {
    const lines = text.split('\n');
    const templates = {};
    
    for (const line of lines) {
      if (line.trim() === '') continue;
      
      // Simple CSV parser - handles quoted fields
      const fields = [];
      let current = '';
      let inQuotes = false;
      
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          fields.push(current);
          current = '';
        } else {
          current += char;
        }
      }
      fields.push(current);
      
      // Clean up the fields - only remove outer quotes if they exist, preserve inner content exactly
      let trigger = fields[0] ? fields[0].trim() : '';
      let expansion = fields[1] ? fields[1].trim() : '';
      
      // Remove outer quotes if present, but preserve the exact content inside
      if (trigger.startsWith('"') && trigger.endsWith('"') && trigger.length >= 2) {
        trigger = trigger.slice(1, -1).replace(/""/g, '"');
      }
      if (expansion.startsWith('"') && expansion.endsWith('"') && expansion.length >= 2) {
        expansion = expansion.slice(1, -1).replace(/""/g, '"');
      }
      
      if (trigger && expansion) {
        templates[trigger] = expansion;
      }
    }
    
    return templates;
  }
  
  function handleFileImport(event) {
    console.log('File import triggered');
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
      const csvText = e.target.result;
      const templates = parseCSV(csvText);
      
      if (Object.keys(templates).length === 0) {
        alert('No valid snippets found in the CSV file.');
        return;
      }
      
      // Create new group name from filename
      const fileName = file.name.replace(/\.[^/.]+$/, ""); // Remove extension
      const groupName = fileName.toLowerCase().replace(/[^a-z0-9]/g, '-');
      
      chrome.storage.local.get(['snippetGroups'], function(result) {
        const snippetGroups = result.snippetGroups || {};
        const existingGroup = snippetGroups[groupName];
        
        // Check if group already exists and ask for confirmation
        if (existingGroup && Object.keys(existingGroup).length > 0) {
          const confirmOverwrite = confirm(`A snippet group named "${fileName}" already exists with ${Object.keys(existingGroup).length} snippets. Do you want to overwrite it with the ${Object.keys(templates).length} snippets from the imported file?`);
          if (!confirmOverwrite) {
            return; // Cancel import if user doesn't want to overwrite
          }
        }
        
        snippetGroups[groupName] = templates;
        
        chrome.storage.local.set({ snippetGroups: snippetGroups }, function() {
          currentGroup = groupName;
          loadTemplates();
          if (existingGroup && Object.keys(existingGroup).length > 0) {
            alert(`Overwritten existing group "${fileName}" with ${Object.keys(templates).length} snippets from the imported file`);
          } else {
            alert(`Imported ${Object.keys(templates).length} snippets into group "${fileName}"`);
          }
        });
      });
    };
    
    reader.readAsText(file);
    fileInput.value = ''; // Reset file input
  }
  
  // Event listeners
  console.log('Setting up event listeners');
  
  addBtn.addEventListener('click', addTemplate);
  cancelBtn.addEventListener('click', resetForm);
  
  // Expand/Collapse functionality
  expandBtn.addEventListener('click', function() {
    console.log('Expand clicked');
    templatesList.classList.remove('templates-collapsed');
    expandBtn.style.display = 'none';
    collapseBtn.style.display = 'block';
  });
  
  collapseBtn.addEventListener('click', function() {
    console.log('Collapse clicked');
    templatesList.classList.add('templates-collapsed');
    collapseBtn.style.display = 'none';
    expandBtn.style.display = 'block';
    // Don't clear search when collapsing - keep it for user convenience
  });
  
  // Last snippet functionality
  viewLastBtn.addEventListener('click', function() {
    if (lastUsedTrigger) {
      chrome.storage.local.get(['snippetGroups'], function(result) {
        const snippetGroups = result.snippetGroups || {};
        const templates = snippetGroups[currentGroup] || {};
        const expansion = templates[lastUsedTrigger];
        
        if (expansion) {
          alert(`Trigger: ${lastUsedTrigger}\n\nExpansion:\n${expansion}`);
        }
      });
    }
  });
  
  editLastBtn.addEventListener('click', function() {
    if (lastUsedTrigger) {
      editTemplate(lastUsedTrigger);
    }
  });
  
  // Snippet group selection
  snippetGroupSelect.addEventListener('change', function() {
    currentGroup = this.value;
    // Save the selected group to storage so content script can access it
    chrome.storage.local.set({ currentGroup: currentGroup }, function() {
      console.log('Current group saved:', currentGroup);
      loadTemplates();
    });
  });
  
  // Add to group selection
  addToGroupSelect.addEventListener('change', function() {
    if (this.value === 'add-new') {
      newGroupNameContainer.style.display = 'block';
      newGroupNameInput.focus();
    } else {
      newGroupNameContainer.style.display = 'none';
    }
  });
  
  // Import/Export functionality
  importBtn.addEventListener('click', importSnippets);
  exportBtn.addEventListener('click', exportSnippets);
  fileInput.addEventListener('change', handleFileImport);
  
  // Rename and Delete snippet group functionality
  renameGroupBtn.addEventListener('click', renameSnippetGroup);
  deleteGroupBtn.addEventListener('click', deleteSnippetGroup);
  
  // Real-time search functionality with auto-expand
  searchTemplatesInput.addEventListener('input', function() {
    const searchTerm = this.value;
    
    // Auto-expand templates when user starts typing
    if (searchTerm.length > 0 && templatesList.classList.contains('templates-collapsed')) {
      console.log('Auto-expanding templates for search');
      templatesList.classList.remove('templates-collapsed');
      expandBtn.style.display = 'none';
      collapseBtn.style.display = 'block';
    }
    
    const filteredTemplates = searchTemplates(searchTerm);
    displayTemplates(filteredTemplates);
  });
  
  // Also trigger search on keyup for immediate feedback
  searchTemplatesInput.addEventListener('keyup', function() {
    const searchTerm = this.value;
    
    // Auto-expand templates when user starts typing
    if (searchTerm.length > 0 && templatesList.classList.contains('templates-collapsed')) {
      console.log('Auto-expanding templates for search');
      templatesList.classList.remove('templates-collapsed');
      expandBtn.style.display = 'none';
      collapseBtn.style.display = 'block';
    }
    
    const filteredTemplates = searchTemplates(searchTerm);
    displayTemplates(filteredTemplates);
  });
  
  triggerInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      expansionInput.focus();
    }
  });
  
  expansionInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      addTemplate();
    }
  });
  
  // ESC key to cancel editing
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && editingTrigger) {
      resetForm();
    }
  });
  
  // Load templates on startup
  console.log('Loading templates on startup');
  loadTemplates();
});