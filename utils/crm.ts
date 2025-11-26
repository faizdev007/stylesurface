
import { CMS } from './cms';

/**
 * Pushes lead data to external CRMs via Webhook.
 * Best practice: Use Zapier/Make.com as the webhook receiver, 
 * then route to Zoho, HubSpot, Wati, etc. from there.
 */
export const syncLeadToCRM = async (leadData: any) => {
  try {
    const settings = await CMS.getSettings();
    const integrations = settings.integrations;

    if (!integrations?.enableAutoSync || !integrations?.zapierWebhook) {
      console.log("CRM Sync skipped: Auto-sync disabled or Webhook URL missing.");
      return { success: false, message: "Configuration missing" };
    }

    // Send data to Zapier / External Webhook
    // 'no-cors' mode is used if the webhook doesn't support CORS preflight, 
    // but standard Zapier webhooks usually handle CORS or require a backend proxy.
    // For standard fetch, we try standard POST.
    const response = await fetch(integrations.zapierWebhook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...leadData,
        source: 'StylenSurface Website',
        timestamp: new Date().toISOString()
      }),
    });

    if (response.ok) {
      console.log("Successfully synced to CRM Webhook");
      return { success: true };
    } else {
      console.error("Failed to sync to CRM", response.statusText);
      return { success: false, message: response.statusText };
    }
  } catch (error) {
    console.error("CRM Sync Error:", error);
    // In 'no-cors' mode, we might catch an error even if it technically sent.
    // However, usually we want to log it.
    return { success: false, error };
  }
};
