chrome.runtime.onInstalled.addListener(function() {
  console.log('Extension installed/updated - loading templates');
  
  // Check existing storage and only add default templates if needed
  chrome.storage.local.get(['snippetGroups'], function(result) {
    console.log('Checking existing storage:', result);
    const existingGroups = result.snippetGroups || {};
    
    // Only add default templates if My Snippets group doesn't exist or is empty
    const mySnippets = existingGroups['my-snippets'] || {};
    const shouldAddDefaults = Object.keys(mySnippets).length === 0;
    
    
    if (shouldAddDefaults) {
      console.log('Adding default templates to My Snippets group');
      const defaultTemplates = {
        "*fcc": "Hello,\n\nAccording to FCC regulation: Once a customer requests service from a new company, the old company cannot refuse to port the number, even if money is owed for an outstanding balance or termination fee. If the customer is under contract, they are accountable to an early termination fee if the contract states; however, this cannot interfere in the port process. Please review https://www.fcc.gov/consumers/guides/porting-keeping-your-phone-number-when-you-change-providers .\n\nRegards,\nTelnyx Porting Team",
        "*1": "Hello, \n\nWe haven't heard back from you regarding this port request. Your port request will be canceled in 1 business day if we do not hear from you. Please follow up with us about your port request.\n\nTony",
        "*2": "Hello, \n\nWe haven't heard back from you regarding this port request. This request will stay in our system for a few more days, but will soon be canceled if there is no response. Please let us know if you'd like to keep this request open. If we do not hear back from you by XX/XX/2021 we will cancel your port request.\n\nTony",
        "*I": "I look forward to hearing from you.\n\nTony",
        "*all": "Hello, \n\nThe losing carrier rejected this request due to all data mismatch. Please contact the losing carrier to confirm the registered business name, account number, service address and auth user and let me know to resubmit.\n\nI look forward to hearing from you.\n\nTony",
        "*bdis": "Hello,\n\nNumber security is very important to Telnyx. Due to issues with numbers being slammed and in turn resulting in users being put out of service we have recently changed our processes to require both a fully signed LOA dated within the last 30 days along with a recent bill/invoice. Although we have always requested this information, we will no longer be processing porting requests unless we have both documents. \n\nThis will ensure that all port requests have proper authority and shows the validation of the end-user to submit the port request.\n\nTony",
        "*bill": "Hello, \n\nThe bill.\n\nPlease upload a copy of the bill dated within 90 calendar days that shows the company name, address, account number, listing all the porting numbers (if applicable) and I'll go ahead and submit your order.\n\nI look forward to hearing from you.\n\nTony",
        "*birch": "Hello,\n\nThis is an important notice. Please be advised that the losing carrier Birch has changed to Fusion. They have applied several internal changes to their port process.\n\nEven though the change won't prevent the port from being completed, the authorized user must contact Fusion once the port is completed to request the removal of translations on the ported numbers (meaning removing the ported numbers from Fusion's switch for the calls to be routed properly). \n\nUnfortunately, they implemented this practice and they won't work with another carrier but with the actual authorized user (unlike any other carrier). I apologize for any inconvenience.\n\nBest regards.\n\nTony",
        "*ch": "We're closing this chat as of now. Please reply to re-open it in case you happen to have further questions.",
        "*cktn": "Hello Team, you can check the portability (and actually start the process when you're ready) here: https://portal.telnyx.com/#/app/numbers/port-numbers/new",
        "*cmo": "Hello team,\n\nPlease keep in mind that all the numbers that belong to the same carrier, account, and location and that will have the same porting date and connection, must be submitted together under one unique port request.\n\nThis will prevent rejections due to pending orders and it will save both teams time and effort.\n\nThe orders below were submitted separately when they should've been submitted as one request:\n\nThese orders have been canceled. Please submit one unique port request and we'll process it. If there are any other numbers for the same carrier, account and location, please put them all together under the same request.\n\nThank you.\n\nTelnyx Porting Team",
        "*csr": "Hello,\n\nThe losing carrier requires to have a CSR in order to process this request. I requested the CSR already, they can take up to 3 business days to generate it. I'll submit your order as soon as the CSR is provided. Updates to follow.\n\nTony",
        "*dj2": "Hello,\n\nThe losing carrier rejected this port with the remarks \"3034845720 - The submitted PIN is invalid. Please contact port@j2.com for assistance.\" Please ask the customer to retrieve the J2 pin to port.\n\nI've submitted a manual LSR to port@j2.com and cc curt.sandvig@j2.com requesting the pin. Please keep in mind they don't always send the pin to manual LSR's and some of the J2 numbers are not portable. In the meantime, please ask the customer to try and get the pin to port from J2.\n\nI look forward to hearing from you.\n\nTony",
        "*dr": "Hello,\n \nAn order goes under Draft status when it's saved instead of submitted, Please open the order in the Telnyx portal, click on the Edit button, then, click on the Next button (at the bottom) a couple of times and click on the Submit Request button to finish the submission.\n \nThank you.",
        "*due": "Due to the losing carrier's release procedures, this order must be activated at 9:30 AM CST.",
        "*ear": "This is the earliest due date allowed by the losing carrier.",
        "*esc": "Hello, \n\nI've contacted the existing carrier and escalated this port request to have a response as soon as possible. I'll let you know once they send a response.\n\nBest regards.\n\nTony",
        "*fc": "Please let me know if the date/time needs to be changed.",
        "*feat": "Hello,\n\nThe losing carrier rejected this port stating there's a special feature preventing the port to be processed. I tried to gather more information regarding the special feature but all they gave me is that it's unknown.\n\nPlease have the end user contacting the losing carrier to remove the special feature and let me know to resubmit.\n\nI look forward to hearing from you.\n\nTony",
        "*foc": "Hello,\n\nThe losing carrier confirmed this port request for XX/XX/2025.\n\nAs soon as the order is complete, please test your numbers and if you encounter any issues, please open a support ticket in the chat within the Telnyx portal with our technical department.\n\nBest regards.\n\nTony",
        "*hp": "Hello, \n\nYou're more than welcome. I'm happy to help.\n\nBest regards.\n\nTony",
        "*ilec": "Hello, \n\nApologies for the situation.\n\nUnfortunately, the current carrier is an ILEC that owns sole coverage of this area.\n\nAn ILEC requires a very specific agreement for number portability known as an Interconnection Agreement to be able to pass traffic from their ILEC footprint. Unfortunately, these can take months or years of negotiations and as a result, we are unable to port these numbers.\n\nThis port request has been canceled as the number is not portable.\n\nBest regards.\n\nTelnyx Porting Team",
        "*int": "Hello, \n\n\nThe number XXX-XXX-XXXX belongs to a different Telnyx customer. In this case, if you wish to request the port, it will follow the process of an internal port.\n\n\n\nPlease send an email with the following information:\n\n\n\n- Numbers to be ported:\n\n- Connection to assign the number(s) to:\n\n- Preferred date/time to port the number(s):\n\n- Main email address of the account it needs to be ported to:\n\n- Completed LOA\n\n\n\nOnce we process the port request, we must notify the current customer about this request and we will only proceed with their approval.\n\n\n\nPlease keep in mind there may be a short outage of approximately 10 minutes on the numbers while we transfer them between accounts.\n\n\n\nInternal ports can only be ported during business hours (9am -5pm Monday - Friday).\n\n\n\nRegards,",
        "*keep": "Please keep in mind the losing carrier could take up to 5 business days to give a response.",
        "*lex": "Hello, \n\nThe losing carrier rejected this port with the remarks \"NP-PORTED NBR not found.\" This means the porting number is either not active, not assigned or not portable.\n\nPlease reach out to the losing carrier in order to resolve the situation if you wish to continue with this port or let me know if I should cancel this request. I look forward to hearing from you.\n\nTony",
        "*loa": "Hello, \n\nThe LOA.\n\nPlease upload a new valid signed LOA listing the company name, the service address, and all the porting numbers, dated within 30 calendar days, and I'll go ahead and submit your order.\n\nI look forward to hearing from you.\n\nTony",
        "*ml": "Hello,\n\nThe numbers are under multiple locations. Please cancel this port request and creat new ones per location.\n\nThank you.\nTelnyx Porting Team",
        "*nbill": "Hello, \n\nPlease keep in mind we'll process this port request without a proof of ownership, therefore, if the losing carrier requests a snapback, we'll release the number back to them.\n\nBest regards.\n\nTony",
        "*nbtn": "Hello,\n\nThe losing carrier rejected this port request because this is not a full port, but a partial port and the main BTN is being ported. The losing carrier requires to have a new BTN assigned to move forward with processing this port.\n\nThe new BTN must be am active number, under the same carrier, account and location. I look forward to hearing from you.\n\nTony",
        "*ndis": "This losing carrier doesn't process disconnects along with port requests. Please contact the losing carrier once the port is completed to request the disconnect.",
        "*noc": "Hello,\n \nOur NOC team will further assist you. Please stand by.\n \nThank you.",
        "*nodis": "This port was submitted requesting the disconnect of remaining services as you requested. Please contact the losing carrier once the port is completed to confirm the disconnect will be processed in order to avoid future additional charges from the losing carrier's end.",
        "*npac": "Hello,\n\nI apologize for the inconvenience.\n\nThe porting number XXXXXXXXXX is not assigned in NPAC to any carrier, therefore, it's not a portable number. Numbers not assigned in NPAC are not supported for porting.\n\nThis port has been canceled. \n\nIn order to get this solved, you or your customer (as owners of the number) should contact the carrier and request to make this number portable. \n\nBest regards.\n\nTony",
        "*od": "Hello, \n\nThe losing carrier has given confirmation for XX/XX/2025.\n\nThis is a friendly reminder for you. Since this order was created with the activation type ON DEMAND, you have a time window that allows you to activate the order in the portal. The activation time window goes from 06:00 AM CT until 8:00 PM CT.\n\nIf you don't activate the order yourself, the system will do it at the end of the activation time window.\n\nBest regards.\n\nTony",
        "*sdis": "This port was submitted requesting the disconnect of the remaining services. Please contact the losing carrier in order to confirm the disconnect will be processed to avoid future extra charges on their end.",
        "*sms": "Hello,\n\nI apologize for the confusion.\n\nThe system shows the numbers are not SMS capable because they're not in our system yet. I confirmed with my team, all the numbers will be SMS capable once they're in our system. \n\nOnce the port is completed the numbers will be SMS capable and you'll be able to assign the SMS profile.\n\nTony",
        "*sov": "Hello,\n\nAs we don't have direct coverage for this rate center, your order has been manually submitted through one of our vendors with the requested due date XX/XX/2020. \n\nSince this order needs to be handled through our vendor, the fast port option will no longer apply, this means the ON-DEMAND activation won't be available as the order needs to be activated at  9:XX AM CST. I apologize for any inconvenience.\n\nUpdates to follow.\n\nBest regards.\n\nTony",
        "*sub": "Hello, \n\nYour order has been submitted with the earliest due date allowed by the losing carrier, which is XX/XX/2025. Updates to follow.\n\nPON:\n\nBest regards.\n\nTony",
        "*sur": "Hello,\n\nYour order has been submitted with the requested due date of XX/XX/2025. Updates to follow.\n\nPON: \n\nBest regards.\n\nTony",
        "*suv": "Hello,\n\nAs we don't have direct coverage for this rate center, your order has been manually submitted through one of our vendors with the requested due date XX/XX/2021. \n\nSince this order needs to be handled through our vendor, the fast port option will no longer apply. This means your order needs to be manually activated at  9:XX AM CST. I apologize for any inconvenience.\n\nUpdates to follow.\n\nBest regards.\n\nTony",
        "*sv": "Hello,\n\nPlease ignore this error message. This is an automated system generated error. \nThe port will still port at the provided FOC date/time.\n\nBest regards.\n\nTony",
        "*tfloa": "Hello, \n\nPlease add \"release to QIT01\" anywhere in your LOA so that the Losing Carrier would know to whom they would release the number.\n\nThank you.\n\nTony",
        "*th": "Thank you for your response.",
        "*yw": "Hello, \n\nYou're more than welcome. I'm happy to help.\n\nTony",
        "-bw": "Bandwidth",
        "-can": "10 days have passed since the FOC date, and the winning carrier didn't port the number. This request is canceled.",
        "-ch": "Hello, \n\nThis process is considered an internal port. Please create a ticket by sending an email to porting@telnyx.com with the following information:\n\nNumbers to be ported:\n\nConnection to assign the number(s) to:\n\nPreferred date/time to port the number(s):\n\nMain email address of the account it needs to be ported to:\n\nCompleted LOA\n\nPlease keep in mind that there may be a short outage of approximately 10 minutes on the numbers while we transfer them between accounts.\n\nInternal ports can only be ported during business hours (9am -5pm Monday - Friday).\n\nPlease let us know if you happen to have further questions.",
        "-cr": "Order canceled as requested.",
        "-cw": "Cingular Wireless",
        "-dis": "Rejected, TN not active",
        "-foc": " Confirmed XX/XX/2025. FOC is valid for ten days.",
        "-gc": "The gaining carrier canceled this port.",
        "-nopin": "Rejected due to missing PIN.",
        "-nrf": "Team,\n\nSince two business days passed and we still have not seen a status change in this request we will proceed to set it as AUTHORIZED, this is because we are required to give the winning carrier response in the 48 hours next to the port-out submission.\n\nThanks!\n\nTelnyx Porting Team",
        "-on": "Onvoy",
        "-pe": "Peerless",
        "-pf": "Team,\n\nPlease be advised that the following port was approved via PIN Validation.\n\nIn case you wish to reject this port-out request you need provide us with the correct information in the Reject comments. If we deem the port out rejection to be invalid, per FCC rules, we will inform you of such and we may be forced to proceed with the port out to the winning carrier. \n\nYou can review the port outs on the account following the instructions available here: https://support.telnyx.com/porting/porting-from-telnyx/port-out-tracking.\n\nThanks!\nTelnyx Porting Team",
        "-pin": "Rejected due to PIN mismatch.",
        "-rej": "Rejected for end user information",
        "-rjc": "Rejected for end-user information.",
        "-vw": "Verizon Wireless",
        "-wor": "Processed, waiting for end-user to approve or reject."
      };
      
      // Preserve existing groups and add/update My Snippets
      const updatedGroups = Object.assign({}, existingGroups);
      updatedGroups['my-snippets'] = defaultTemplates;
      
      chrome.storage.local.set({ 
        snippetGroups: updatedGroups,
        currentGroup: 'my-snippets' 
      }, function() {
        console.log('Default snippets added to my-snippets group');
        console.log('All existing groups preserved');
      });
    } else {
      console.log('My Snippets group already exists, preserving all groups');
      // Just ensure currentGroup is set if not already
      chrome.storage.local.get(['currentGroup'], function(groupResult) {
        if (!groupResult.currentGroup) {
          chrome.storage.local.set({ currentGroup: 'my-snippets' });
        }
      });
    }
  });
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
  if (namespace === 'local' && changes.snippetGroups) {
    console.log('Snippet groups updated:', changes.snippetGroups.newValue);
  }
});