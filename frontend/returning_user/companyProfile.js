const Profile = () => {
  const modal = 
  {
	"type": "modal",
	"close": {
		"type": "plain_text",
		"text": "Close",
		"emoji": true
	},
	"title": {
		"type": "plain_text",
		"text": "Profile",
		"emoji": true
	},
	"blocks": [
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*Company Name* - "
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*Client Base* - "
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*Industry* - "
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*Location* - "
			}
		}
	]
}
  return modal;
};
module.exports = {Profile};