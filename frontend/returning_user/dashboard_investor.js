const startup_investor = require("../../model/startup_investorModel")
const startup_investorController = require("../../controller/startup_investor.js"); 
const investor = async (data) => {
  
  // startup_investorController.matchStartups().then(res => {
  // console.log(res[0].db_sValuation);
    let blocks = [
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*Hey <User Name>*"
			}
		},
		{
			"type": "actions",
			"elements": [
				{
					"type": "button",
					"text": {
						"type": "plain_text",
						"text": "My Profile",
						"emoji": true
					},
					"value": "approve"
				},
				{
					"type": "button",
					"text": {
						"type": "plain_text",
						"text": "Ongoing Deals",
						"emoji": true
					},
					"value": "decline"
				},
				{
					"type": "button",
					"text": {
						"type": "plain_text",
						"text": "Dashboard",
						"emoji": true
					},
					"value": "details"
				},
				{
					"type": "button",
					"text": {
						"type": "plain_text",
						"text": "Saved For Later",
						"emoji": true
					},
					"value": "details"
				}
			]
		},
		{
			"type": "divider"
		},
		{
			"type": "header",
			"text": {
				"type": "plain_text",
				"text": "Matches",
				"emoji": true
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "This is your list of matches. You can always update your preferences from your profile"
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*Match 01*"
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Startup Looking to Raise: Range"
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Valuation" 
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "EBIT"
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Vertical: " + data[0].db_sValuation
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Ownership:"
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Funding Stage:"
			}
		},
		{
			"type": "actions",
			"elements": [
				{
					"type": "button",
					"text": {
						"type": "plain_text",
						"text": "Show Interest",
						"emoji": true
					},
					"style": "primary",
					"value": "approve"
				},
				{
					"type": "button",
					"text": {
						"type": "plain_text",
						"text": "Reject",
						"emoji": true
					},
					"style": "danger",
					"value": "decline"
				},
				{
					"type": "button",
					"text": {
						"type": "plain_text",
						"text": "Save for Later",
						"emoji": true
					},
					"value": "details"
				}
			]
		},
		{
			"type": "divider"
		}
	]  
  
  const modal = 
    {
    "type": "home",
    "blocks": blocks
    }

  return modal;
    
  // }) // then
  
  
};
module.exports = {investor};

