const serviceProvider_Modal = () => {
  const modal = 
  
 {
	"type": "modal",
	"callback_id": "serviceProvider2",
	"title": {
		"type": "plain_text",
		"text": "Varidus Marketplace",
		"emoji": true
	},
	"submit": {
		"type": "plain_text",
		"text": "Submit",
		"emoji": true
	},
	"close": {
		"type": "plain_text",
		"text": "Cancel",
		"emoji": true
	},
	"blocks": [
		{
			"type": "section",
			"text": {
				"type": "plain_text",
				"text": "Help us get you the best of the best by giving us few more detail on what you are looking for!",
				"emoji": true
			}
		},
		{
			"type": "input",
			"block_id": "msg_ClientBase",
			"element": {
				"type": "checkboxes",
				"options": [
					{
						"text": {
							"type": "plain_text",
							"text": "B2B",
							"emoji": true
						},
						"value": "B2B"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "B2C",
							"emoji": true
						},
						"value": "B2C"
					}
				],
				"action_id": "checkboxes_action"
			},
			"label": {
				"type": "plain_text",
				"text": "What Client Base do you serve?",
				"emoji": true
			}
		},
		{
			"type": "input",
			"block_id": "msg_Type",
			"element": {
				"type": "checkboxes",
				"options": [
					{
						"text": {
							"type": "plain_text",
							"text": "Freelancer",
							"emoji": true
						},
						"value": "Freelancer"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Adviser",
							"emoji": true
						},
						"value": "Adviser"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Company",
							"emoji": true
						},
						"value": "Company"
					}
				],
				"action_id": "checkboxes_action"
			},
			"label": {
				"type": "plain_text",
				"text": "Type of partner",
				"emoji": true
			}
		},
		{
			"type": "input",
			"block_id": "msg_Services",
			"element": {
				"type": "checkboxes",
				"options": [
					{
						"text": {
							"type": "plain_text",
							"text": "Accounting, Audit & Advisory",
							"emoji": true
						},
						"value": "Accounting, Audit & Advisory"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Consulting",
							"emoji": true
						},
						"value": "Consulting"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Legal (& Notary)",
							"emoji": true
						},
						"value": "Legal (& Notary)"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Tax",
							"emoji": true
						},
						"value": "Tax"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Advertising, Sales, Marketing & PR",
							"emoji": true
						},
						"value": "Advertising, Sales, Marketing & PR"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Web, Mobile, Software Design & Development",
							"emoji": true
						},
						"value": "Web, Mobile, Software Design & Development"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Recruiting & HR",
							"emoji": true
						},
						"value": "Recruiting & HR"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Writing & Translation",
							"emoji": true
						},
						"value": "Writing & Translation"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Design & Multimedia",
							"emoji": true
						},
						"value": "Design & Multimedia"
					}
				],
				"action_id": "checkboxes_action"
			},
			"label": {
				"type": "plain_text",
				"text": "Line of services:",
				"emoji": true
			}
		},
		{
			"type": "input",
			"block_id": "msg_Location",
			"element": {
				"type": "checkboxes",
				"options": [
					{
						"text": {
							"type": "plain_text",
							"text": "Eastern & Middle Africa",
							"emoji": true
						},
						"value": "Eastern & Middle Africa"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Western, Northern & South Africa",
							"emoji": true
						},
						"value": "Western, Northern & South Africa"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "The Caribbean",
							"emoji": true
						},
						"value": "The Caribbean"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Central America",
							"emoji": true
						},
						"value": "Central America"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "South America",
							"emoji": true
						},
						"value": "South America"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Northern America",
							"emoji": true
						},
						"value": "Northern America"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Asia",
							"emoji": true
						},
						"value": "Asia"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Europe & European Union",
							"emoji": true
						},
						"value": "Europe & European Union"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Oceania",
							"emoji": true
						},
						"value": "Oceania"
					}
				],
				"action_id": "checkboxes_action"
			},
			"label": {
				"type": "plain_text",
				"text": "Select regions you serve ",
				"emoji": true
			}
		}
	]
};

  
  return modal;
};
module.exports = {serviceProvider_Modal};