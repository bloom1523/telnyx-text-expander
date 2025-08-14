# 📥 Installation Guide - Telnyx Text Expander

Follow these step-by-step instructions to install the Telnyx Text Expander extension in Chrome or Edge.

## 🎯 Quick Install (Recommended)

### Method 1: Download from Releases

1. **📥 Go to Releases Page**
   - Visit: [GitHub Releases](https://github.com/yourusername/telnyx-text-expander/releases)
   - Click on the **latest release** (should be at the top)

2. **⬇️ Download the Extension**
   - Look for **Assets** section at the bottom of the release
   - Click on `telnyx-text-expander-v1.0.zip` to download
   - Save it to your **Downloads** folder or preferred location

3. **📂 Extract the Files**
   - **Right-click** the downloaded ZIP file
   - Select **"Extract All..."** (Windows) or **double-click** (Mac)
   - Choose extraction location (Desktop is fine for easy access)
   - You should now have a folder named `telnyx-text-expander-v1.0`

### Method 2: Download Source Code

1. **📥 Download from Main Page**
   - Go to the [main repository page](https://github.com/yourusername/telnyx-text-expander)
   - Click the green **"Code"** button
   - Select **"Download ZIP"**

2. **📂 Extract and Navigate**
   - Extract the downloaded ZIP file
   - The folder contains all the extension files directly

## 🌐 Install in Chrome

### Step-by-Step Chrome Installation

1. **🔧 Open Chrome Extensions**
   - Open **Google Chrome** browser
   - Type `chrome://extensions/` in the address bar and press **Enter**
   - OR click the **3-dots menu** → **More tools** → **Extensions**

2. **⚙️ Enable Developer Mode**
   - Look for **"Developer mode"** toggle in the **top-right corner**
   - **Click the toggle** to turn it ON (it should turn blue/green)
   - New buttons will appear: "Load unpacked", "Pack extension", "Update"

3. **📁 Load the Extension**
   - Click **"Load unpacked"** button
   - **Browse** to the folder you extracted earlier
   - Select the folder containing the extension files:
     - If you downloaded from Releases: Select `telnyx-text-expander-v1.0` folder
     - If you downloaded source: Select the main folder with `manifest.json`
   - Click **"Select Folder"** (Windows) or **"Open"** (Mac)

4. **✅ Verify Installation**
   - The extension should appear in your extensions list
   - You should see **"Text Expander"** with the Telnyx icon
   - The extension icon should appear in your **toolbar**

5. **📌 Pin to Toolbar (Recommended)**
   - Click the **puzzle piece icon** (🧩) in Chrome's toolbar
   - Find **"Text Expander"**
   - Click the **pin icon** to keep it visible in toolbar

## 🔷 Install in Microsoft Edge

### Step-by-Step Edge Installation

1. **🔧 Open Edge Extensions**
   - Open **Microsoft Edge** browser
   - Type `edge://extensions/` in the address bar and press **Enter**
   - OR click the **3-dots menu** → **Extensions**

2. **⚙️ Enable Developer Mode**
   - Look for **"Developer mode"** toggle on the **left sidebar**
   - **Click the toggle** to turn it ON
   - New options will appear

3. **📁 Load the Extension**
   - Click **"Load unpacked"** button
   - **Browse** to your extracted extension folder
   - Select the folder containing `manifest.json`
   - Click **"Select Folder"**

4. **✅ Verify Installation**
   - The extension appears in your extensions list
   - Extension icon appears in toolbar

5. **📌 Pin to Toolbar**
   - Click the **3-dots menu** in Edge
   - Select **Extensions**
   - Find your extension and click **"Show in toolbar"**

## 🎉 First Use & Testing

### Getting Started

1. **🖱️ Click the Extension Icon**
   - Look for the Telnyx Text Expander icon in your toolbar
   - Click it to open the extension popup

2. **📝 Create Your First Snippet**
   - In the "Add New Template" section:
     - **Trigger**: `*hello`
     - **Expansion**: `Hello! How can I help you today?`
   - Click **"Add Template"**

3. **🌐 Test Your First Snippet**
   - Navigate to any website with text input (Gmail, Google Docs, etc.)
   - Click in a text field
   - Type `*hello` and see it expand automatically
   - You should hear a confirmation sound

### Advanced Testing

4. **📁 Test Group Management**
   - Create a new group: Select "Add New..." from dropdown
   - Enter group name: "Test Templates"
   - Add a snippet to the new group
   - Switch between groups using the dropdown

5. **🔍 Test Search Functionality**
   - Add several snippets
   - Click "+" to expand templates
   - Use the search box to filter templates
   - Search works on both triggers and content

6. **💾 Test Import/Export**
   - Click "Export Snippets" to download your snippets
   - Create a test CSV with format: `"*test","This is a test"`
   - Use "Import Snippets" to import the CSV

### Recommended Test Sites

**Communication Platforms:**
- **Gmail**: compose.gmail.com
- **Google Docs**: docs.google.com
- **Slack**: your-workspace.slack.com

**Business Applications:**
- **Zendesk**: yourcompany.zendesk.com
- **Salesforce**: login.salesforce.com
- **Microsoft Teams**: teams.microsoft.com

**Telnyx Platforms:**
- **Portal**: portingadmin.telnyx.com
- **Console**: console.telnyx.com
- **Developer**: developers.telnyx.com

## 🔧 Troubleshooting

### ❌ Common Installation Issues

**Problem: Extension won't load**
```
✅ Solution:
- Make sure Developer mode is enabled
- Select the correct folder (the one with manifest.json)
- Try refreshing the extensions page
- Restart Chrome/Edge and try again
```

**Problem: "Could not load extension" error**
```
✅ Solution:
- Check that all files are present in the folder:
  ✓ manifest.json
  ✓ popup.html, popup.js, popup.css
  ✓ content.js, background.js
  ✓ T.png, Telnyx icon.png, Sound.mp3
- Verify manifest.json is not corrupted
- Try downloading the extension again
- Ensure folder path doesn't have special characters
```

**Problem: Extension loads but icon doesn't appear**
```
✅ Solution:
- Check if extension is enabled in extensions page
- Click the puzzle piece icon (🧩) and pin the extension
- Try reloading the extension from extensions page
- Check browser console for errors (F12 → Console)
```

**Problem: Extension popup is blank**
```
✅ Solution:
- Disable and re-enable the extension
- Check for JavaScript errors in browser console
- Try refreshing any open website tabs
- Clear browser cache and reload extension
```

**Problem: Snippets not expanding**
```
✅ Solution:
- Make sure the correct snippet group is selected
- Verify triggers are typed exactly as saved (case-sensitive)
- Check that you're typing in a standard text input field
- Try refreshing the web page
- Ensure extension has permission for the website
```

**Problem: Audio not playing**
```
✅ Solution:
- Check browser audio permissions
- Verify system volume and browser volume settings
- Try using extension on different websites
- Refresh page if audio stops working
- Check if Sound.mp3 file is present in extension folder
```

### 🔄 Testing the Extension

**Before using for important work:**

1. **Test Basic Functionality**
   - Create test snippets (not real sensitive data)
   - Verify triggers work on different websites
   - Check that expansion text appears correctly

2. **Test Group Management**
   - Create multiple groups
   - Switch between groups
   - Verify only active group triggers work

3. **Test Search and Edit**
   - Use search to find snippets
   - Edit existing snippets
   - Delete test snippets

4. **Test Import/Export**
   - Export your snippets as backup
   - Test importing a sample CSV
   - Verify imported snippets work correctly

### 🆘 Getting Help

If you're still having issues:

1. **📋 Check System Requirements**
   - Chrome 88+ or Edge (Chromium-based) 88+
   - Windows, Mac, or Linux
   - Active internet connection for initial setup

2. **🐛 Report Issues**
   - Go to [GitHub Issues](https://github.com/yourusername/telnyx-text-expander/issues)
   - Click **"New Issue"**
   - Include:
     - Browser version
     - Operating system
     - Error messages (if any)
     - Steps that led to the problem
     - Website where issue occurred

3. **💡 Check Existing Solutions**
   - Search [existing issues](https://github.com/yourusername/telnyx-text-expander/issues?q=is%3Aissue)
   - Check [Discussions](https://github.com/yourusername/telnyx-text-expander/discussions)
   - Review the main [README](README.md)

## 🔒 Security & Privacy Notes

### Installation Safety
- **✅ Safe Installation**: Loading unpacked extensions in Developer mode is safe
- **✅ Local Processing**: All snippet data stored locally on your computer
- **✅ Minimal Permissions**: Extension only requests necessary browser access
- **✅ No Data Collection**: Extension doesn't track or store personal information

### Website Access
- **✅ Required Access**: Extension needs to interact with websites to expand text
- **✅ Active Tab Only**: Only accesses current tab when snippets are triggered
- **✅ No Background Tracking**: Only runs when explicitly used
- **✅ Audio Feedback**: Sound.mp3 plays locally (no external audio requests)

## 🚀 What's Next?

After successful installation:

### **🎯 Start Building Your Snippet Library**
1. **Create** snippet groups for different purposes (Work, Personal, etc.)
2. **Add** commonly used text templates
3. **Test** on your most-used websites
4. **Organize** snippets with memorable triggers

### **📚 Learn Advanced Features**
- **Import/Export**: Backup your snippets and share with team
- **Group Management**: Organize snippets by project or context
- **Search**: Quickly find snippets as your library grows
- **Keyboard Shortcuts**: Speed up snippet creation and editing

### **⭐ Help Improve the Extension**
- **Star** the GitHub repository if you find it helpful
- **Report** any issues or bugs you encounter
- **Suggest** new features or improvements
- **Share** with colleagues who might benefit

### **🔄 Stay Updated**
- **Watch** the repository for new releases
- **Enable** browser notifications for extension updates
- **Check** release notes for new features and fixes

---

**Installation successful?** Great! You're ready to transform your typing productivity! 🎉

**Need more help?** [Create an Issue](https://github.com/yourusername/telnyx-text-expander/issues/new) or check the [complete user guide](README.txt).