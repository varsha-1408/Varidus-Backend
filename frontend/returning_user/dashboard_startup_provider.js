const startup_provider = () => {
  const modal = 
  {
	"type": "home",
	"blocks": [
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
				"text": "Type of Service Provider: "
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Line of Service: "
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Location: "
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
}

  return modal;
};
module.exports = {startup_provider};

