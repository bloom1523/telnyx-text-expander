TELNYX TEXT EXPANDER - CHROME EXTENSION
======================================

INSTALLATION INSTRUCTIONS
=========================

1. Download the Zip file and extract all files to a safe location in your computer:
   - manifest.json
   - popup.html
   - popup.js
   - popup.css
   - content.js
   - background.js
   - T.png
   - Telnyx icon.png
   - Sound.mp3 (for audio feedback)

2. Open Chrome browser and navigate to chrome://extensions/

3. Enable "Developer mode" by clicking the toggle switch in the top-right corner

4. Click "Load unpacked" button

5. Select the folder containing all the extension files

6. The Telnyx Text Expander extension should now appear in your extensions list

7. Pin the extension to your toolbar by clicking the puzzle piece icon and pinning "Text Expander"


HOW TO USE THE EXTENSION
========================

The extension works by expanding short trigger phrases into longer text templates when you type them in any web page input field.

BASIC USAGE:
- Type a trigger (like "*1" or "@email") in any text field
- The extension will automatically replace it with the corresponding expansion text
- Triggers work in emails, forms, chat applications, and most web-based text inputs
- You'll hear a confirmation sound when a snippet expands (if audio is enabled in your browser)

SUPPORTED WEBSITES:
- Works on all websites including Gmail, Zendesk, Slack, and custom web applications
- Fully compatible with portingadmin.telnyx.com and other Telnyx tools
- Supports both simple text fields and rich text editors


HOW TO ADD SNIPPETS
==================

1. Click the Telnyx Text Expander icon in your browser toolbar

2. In the "Add New Template" section:
   - Select which group to add the snippet to using the "Add to Group" dropdown
   - To create a new group, select "Add New..." and enter a group name
   - Enter your trigger text (e.g., "*hello", "@signature", "-quick")
   - Enter the expansion text (the full text you want inserted)
   - Click "Add Template"

3. Your new snippet is now ready to use!

TRIGGER TIPS:
- Use unique prefixes like *, @, or - to avoid accidental expansions
- Keep triggers short and memorable
- Avoid spaces in triggers


HOW TO MANAGE SNIPPET GROUPS
============================

SELECTING GROUPS:
1. Use the "Snippet Group Selected" dropdown at the top of the extension popup
2. Select the group you want to view/manage
3. Only triggers from the selected group will be active for expansion
4. You can have multiple groups for different purposes (work, personal, projects, etc.)

CREATING NEW GROUPS:
- When adding a new template, select "Add New..." from the "Add to Group" dropdown
- Enter a name for your new group
- The new group will be created automatically when you save the template

RENAMING SNIPPET GROUPS:
1. Select the group you want to rename from the dropdown
2. Click the "Rename Snippet Group" button (blue button)
3. Enter the new name in the prompt dialog
4. All snippets in the group will remain intact with the new group name
5. The renamed group becomes your active group automatically

DELETING SNIPPET GROUPS:
1. Select the group you want to delete from the dropdown
2. Click the "Delete Snippet Group" button (red button)
3. Confirm the deletion in the dialog
4. All snippets in that group will be permanently deleted
5. You'll automatically switch to another available group
6. Note: You cannot delete the last remaining group (minimum one group required)

GROUP MANAGEMENT FEATURES:
- Both rename and delete buttons are disabled when you have only one group
- Group names are automatically converted to URL-friendly format (lowercase, hyphens instead of spaces)
- Duplicate group names are not allowed - you'll be prompted to choose a different name


HOW TO SEARCH TEMPLATES
=======================

REAL-TIME SEARCH:
1. The search box is always visible below the "Saved Templates" title
2. Simply start typing in the search box - no buttons to click
3. Templates will automatically expand and show filtered results as you type
4. Search works on both trigger text and expansion content

SEARCH FEATURES:
- **Instant results**: Results update with each character you type
- **Smart filtering**: Searches both triggers AND snippet content
- **Case-insensitive**: Works regardless of capitalization
- **Auto-expand**: Templates automatically expand when you start searching
- **Group-specific**: Only searches within the currently selected snippet group
- **Persistent**: Search text remains when collapsing/expanding templates

SEARCH EXAMPLES:
- Type "*" to show all triggers containing asterisk
- Type "FOC" to show triggers/snippets containing "foc" (case-insensitive)
- Type "email" to find all snippets related to email
- Type partial words to find matches anywhere in triggers or content


HOW TO VIEW AND EDIT SAVED TEMPLATES
====================================

VIEWING TEMPLATES:
1. In the extension popup, find the "Saved Templates" section
2. Click the "+" button to expand and see all templates in the current group
3. Click the "-" button to collapse the list
4. Each template shows the trigger and a preview of the expansion text
5. Use the search box (always visible) to filter templates in real-time

EDITING TEMPLATES:
1. Expand the "Saved Templates" section (or use search to find the template)
2. Click on any template item to edit it, OR click the pencil (✏) icon
3. The template will load into the "Add New Template" form for editing
4. Make your changes and click "Update Template"
5. Click "Cancel" to discard changes

DELETING TEMPLATES:
1. Expand the "Saved Templates" section (or search for the template)
2. Click the "×" button next to any template you want to delete
3. Confirm the deletion when prompted

LAST SNIPPET FUNCTIONALITY:
- The "View" button shows details of the last snippet you used
- The "Edit" button loads the last used snippet for editing
- Buttons are disabled if no snippet has been used yet


HOW TO IMPORT/EXPORT SNIPPETS
=============================

IMPORTING SNIPPETS:
1. Click the "Import Snippets" button
2. Select a CSV file from your computer
3. The file should have two columns: trigger,expansion
4. Example CSV format:
   "*hello","Hello! How can I help you today?"
   "@email","support@yourcompany.com"
5. If a snippet group with the same name already exists, you'll be asked to confirm overwriting it
6. Imported snippets will be organized into a new group named after your CSV file

EXPORTING SNIPPETS:
1. Select the snippet group you want to export using the "Snippet Group Selected" dropdown
2. Click the "Export Snippets" button
3. A CSV file will be downloaded to your computer
4. The file will be named: [group-name]-snippets-[date].csv

CSV FORMAT REQUIREMENTS:
- Use UTF-8 encoding
- Properly escape quotes by doubling them ("")
- Each row should have exactly two columns: trigger and expansion
- Wrap text containing commas or quotes in double quotes


AUDIO FEEDBACK
==============

SOUND CONFIRMATION:
- The extension plays a confirmation sound (Sound.mp3) when a snippet expands
- This helps you know when triggers are successfully activated
- Sound works on all supported websites
- Volume is set to 70% for comfortable listening

AUDIO TROUBLESHOOTING:
- If you don't hear sounds, check your browser's audio settings
- Ensure your system volume is turned up
- Some websites may block audio - try refreshing the page
- The extension will continue to work even if audio fails


ADDITIONAL FEATURES
==================

GROUP ISOLATION:
- Only triggers from the currently selected group are active
- Same triggers can exist in different groups without conflict
- Switch between groups to change which set of triggers are available

KEYBOARD SHORTCUTS:
- Press Tab while in the trigger field to move to expansion field
- Press Enter while in expansion field to save the template
- Press Escape while editing to cancel changes

DATA STORAGE:
- All snippets are stored locally in your browser using Chrome's storage API
- Data persists between browser sessions
- Imported CSV files can be deleted after import - data is saved in the extension
- Uninstalling the extension will delete all stored snippets
- Group selections and last used snippets are remembered

CROSS-BROWSER COMPATIBILITY:
- Designed specifically for Chrome (Manifest V3)
- Works with all modern Chrome versions
- Compatible with Chromium-based browsers (Edge, Brave, etc.)


ADVANCED FEATURES
================

REAL-TIME TEMPLATE MANAGEMENT:
- All changes to templates and groups are saved immediately
- No manual save required - everything auto-saves
- Changes sync instantly across all browser tabs

SMART ELEMENT DETECTION:
- Works with standard HTML input fields and textareas
- Compatible with rich text editors (Gmail compose, etc.)
- Supports contentEditable elements
- Handles complex web applications and single-page apps

PERFORMANCE OPTIMIZATION:
- Efficient memory usage - only loads current group templates
- Fast search with real-time filtering
- Minimal impact on page loading and performance


TROUBLESHOOTING
==============

SNIPPETS NOT EXPANDING:
- Make sure the correct snippet group is selected
- Verify the trigger text is typed exactly as saved (case-sensitive)
- Check that you're typing in a standard text input field
- Try refreshing the web page
- Ensure the extension is enabled in chrome://extensions/

SEARCH NOT WORKING:
- Search only works within the currently selected group
- Make sure templates are expanded (search auto-expands them)
- Clear the search box and try again
- Switch to a different group and back

AUDIO NOT PLAYING:
- Check browser audio permissions
- Verify system volume and browser volume settings
- Try using the extension on a different website
- Refresh the page if audio stops working

GROUP MANAGEMENT ISSUES:
- You cannot delete or rename when only one group exists
- Group names must be unique - choose a different name if prompted
- Switching groups clears any active search filters

EXTENSION NOT WORKING:
- Check that the extension is enabled in chrome://extensions/
- Ensure all extension files are in the same folder
- Try reloading the extension (disable and re-enable it)
- Check browser console for any error messages
- Verify all required files are present (especially Sound.mp3)

IMPORT/EXPORT ISSUES:
- Ensure CSV file has proper format: "trigger","expansion"
- Check that quotes are properly escaped in the CSV
- Verify file encoding is UTF-8
- File names become group names (avoid special characters)

WEBSITE COMPATIBILITY:
- Most modern websites are supported
- Some complex applications may require a page refresh
- Rich text editors generally work but may have slight delays
- Report specific website issues to the development team

For additional support, contact the Telnyx team.


VERSION HISTORY
===============

Latest Version Features:
- Audio feedback with Sound.mp3 confirmation
- Real-time search functionality with auto-expand
- Snippet group management (rename, delete, create)
- Enhanced template organization and filtering
- Improved website compatibility including Zendesk and Gmail
- Advanced keyboard shortcuts and user experience improvements
- Robust import/export with CSV format support
- Cross-frame compatibility for complex web applications