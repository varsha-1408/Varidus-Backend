// intro page of the app

const introPage = () => {
  let view = {
	"type": "home",
    callback_id: "front_view",
	"blocks": [
    {
        type: "section",
        block_id: "marketplace_intro",
        text: {
          type: "mrkdwn",
          text: "*Welcome to Varidus Marketplace*"
        },
        accessory: {
          type: "image",
          image_url:
            "https://media-exp1.licdn.com/dms/image/C510BAQG6r7iKE6BGkA/company-logo_200_200/0?e=2159024400&v=beta&t=Hw8PYcAE5pAKvPYwNqkEwdhhBYUkFDlh915ttmP90sg",
          alt_text: "Varidus"
        }
    },
		{
			"type": "section",
			"text": {
				"type": "plain_text",
				"text": "Varidus helps other technology startups in seed stage, angel stage, growth stage and exit stage by Partnerships, Capital and Cost reduction.",
				"emoji": true
			}
		},
		{
			"type": "section",
			"text": {
				"type": "plain_text",
				"text": "👋 Hey! \nGreat to see you here! Varidus Marketplace is a digital environment that helps you find new leads to build a reliable clientele and provide the best of your services. Our product provides an end to end experience right within Slack. You can stay up-to-date with all your meetings and track your progress with the clients right here all within Slack.  \n ",
				"emoji": true
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*Select type of user*\nChoose from different User Types"
			},
			"accessory": {
				"type": "static_select",
        "action_id": "user_type_selected",
				"placeholder": {
					"type": "plain_text",
					"text": "Choose User Type",
					"emoji": true
				},
				"options": [
					{
						"text": {
							"type": "plain_text",
							"text": "Startup Looking to Raise Funds",
							"emoji": true
						},
						"value": "startup_funds"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Startup Looking for Service Providers",
							"emoji": true
						},
						"value": "startup_provider"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Service Provider Looking for new Clients",
							"emoji": true
						},
						"value": "service_provider"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Investor looking for Startups",
							"emoji": true
						},
						"value": "investor"
					}
				]
			}
		}
	]
  };
  return view;
};

module.exports = { introPage };










// const introPage = () => {
//   let view = {
//     type: "home",
//     callback_id: "front_view",
//     title: {
//       type: "plain_text",
//       text: "Welcome!"
//     },

//     blocks: [
//       {
//         type: "section",
//         block_id: "marketplace_intro",
//         text: {
//           type: "mrkdwn",
//           text: "*Welcome to Varidus Marketplace*"
//         },
//         accessory: {
//           type: "image",
//           image_url:
//             "https://media-exp1.licdn.com/dms/image/C510BAQG6r7iKE6BGkA/company-logo_200_200/0?e=2159024400&v=beta&t=Hw8PYcAE5pAKvPYwNqkEwdhhBYUkFDlh915ttmP90sg",
//           alt_text: "Varidus"
//         }
//       },
//       {
//         type: "divider"
//       },
//       {
//         type: "divider"
//       },
//       {
//         type: "section",
//         block_id: "instructions_to_proceed",
//         text: {
//           type: "plain_text",
//           text:
//             "Select your requirements and provide us details to find match for you.\n\n\n\nStep1: Select user type\n\n\nStep2: Fill in your details and preferences\n\n\nStep3: Submit",
//           emoji: true
//         }
//       },
//       {
//         type: "divider"
//       },
//       {
//         type: "divider"
//       },
//       {
//         type: "section",
//         block_id: "usertype",
//         text: {
//           type: "mrkdwn",
//           text: "*Please select type of user*"
//         },
//         accessory: {
//           type: "static_select",
//           action_id: "user_type_selected",
//           placeholder: {
//             type: "plain_text",
//             text: "Select user type"
//           },
//           options: [
//             {
//               text: {
//                 type: "plain_text",
//                 text: "Service Provider",
//                 emoji: true
//               },
//               value: "serviceprovider"
//             },
//             {
//               text: {
//                 type: "plain_text",
//                 text: "Startup",
//                 emoji: true
//               },
//               value: "startup"
//             },
//             {
//               text: {
//                 type: "plain_text",
//                 text: "Investor",
//                 emoji: true
//               },
//               value: "investor"
//             }
//           ]
//         }
//       }
//     ]
//   };

//   return view;
// };

// module.exports = { introPage };
