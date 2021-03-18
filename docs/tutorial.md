# Building A Home for Your App - Learn how to create the App Home view and use the modals

Published: November 22, 2019<br>
Updated: March 17, 2020

![App Home Demo -Stickies](https://api.slack.com/img/api/articles/app_home/demo_apphome_static.png)

Your Slack app's **App Home** is a focused, 1:1 space in Slack shared between individual users and your app. Within every App Home, users find multiple tabs: **About**, **Messages**, and the newly introduced **Home tab**. The home tab is a dynamic and persistent visual interface allowing users to interact privately with your app. Your app can greet users, showcase customized content, or even be a little playful!

### Wait, don’t I already have an App Home?

This new feature may sound familiar to you! 
There's been an event called [`app_home_opened`](https://api.slack.comevents/app_home_opened) for some time, triggered when a user selects an app from the left-hand menu. 

It's a great opportunity, [showcased in this tutorial](https://api.slack.com/tutorials/hello-world-bolt),  to welcome a user with a message with timely information.

With the **home tab**, your app can go beyond messaging to display more organized, dynamic content with [blocks](https://api.slack.com/reference/block-kit/blocks) in a persistent location independent of conversation.

## App Home tabs

This is what the new surface area looks like for the Google Calendar Slack app:

![App Home in Google Calendar](https://api.slack.com/img/api/articles/app_home/app_home_google_calendar.png)

You can view your daily calendar from the app's Home tab, where you can modify your invitation response or join a conference call on Zoom. 

In the Message tab is where the app sends you direct messages, for example in Google Calendar, the app notifies you by sending a message 1 minute before a meeting. 

And in the About tab, you can view information about the app.


## Creating an App Home 

To demonstrate what you can do with App Home, I am going to walk you through with an app called **Stickies**, which allows users to store short, private notes within the Home tab.


### User Flow

1. A user clicks the name of the app under **Apps** in the left-hand side menu in Slack client
2. The Home tab should be opened by default
3. The user can add a new note by clicking the button in the pane
4. The user fills out the form in a modal window, then clicks Create
5. The Home pane should be automatically updated with the new note entry

![App Home user flow GIF](https://api.slack.com/img/api/articles/app_home/demo_apphome.gif)


### App Flow


1. When a user opens the App Home, the `app_home_opened` event gets triggered to the app server
2. The app uses the user ID from the event payload to display the initial view with a button with [`views.publish`](https://api.slack.com/methods/views.publish) method
3. When the user clicks the “Add a Stickie” button, an interaction gets triggered
4. App opens a modal with form inputs using the [`views.open`](https://api.slack.com/methods/views.open) method
5. Once the user submits the form, another interaction is triggered with a type of `view_submission`
6. Update the App Home using [`views.publish`](https://api.slack.com/methods/views.publish) method

![Diagram](https://api.slack.com/img/api/articles/app_home/app_diagram.png)


Now, let’s create the Stickies app for your workspace. The source code of the app is on Glitch, where you can "remix" and run without deploying code!


🎏🍴 [Remix (fork) the Glitch repo](https://glitch.com/edit/#!/remix/apphome-bolt-demo-note)


## Setting up your app

First of all, you need to set up your app on Slack. Go to [Slack App Management](/apps?new_app=1&ref=workshop-glitch) to create an app or click the button: 

<a href="https://api.slack.com/apps?new_app=1&ref=workshop-glitch" target="_blank"><img src="https://cdn.glitch.com/b0065ebc-aa72-44cf-a442-65a76aff7ffd%2Fcreate_app_button_medium.png?v=1584382862390" alt="create an app"></a>


Next, go to **Features > OAuth & Permissions** to specify the **Bot Token Scopes**. 
Select `chat.write`. (Technically, our sample app does not send any messages, but just follow this instruction for now. 

To learn more about this new more granular bot permission model, read [Installing with OAuth 2.0, Version 2](https://api.slack.com/authentication/oauth-v2#perspective)!)

Now, go to **Features > App Home**. The **Home Tab** and the **Messages Tab** should be checked by default, although, for this tutorial, the Message Tab is optional.

Next, go to **Features > Event Subscription** to enable events (See Step 1 in the screenshot below). 
Then enter your Request URL (Step 2). 

If you remixed the example Glitch code, your Request URL should be `https://your-project.glitch.me/slack/events`. (Glitch generates a project name when you create a project. So you probably have a project name composed of two random words, such as _fluffy-umbrella_. You can customize the project name as I did. If you're running on your own server, prepend the URL to `/slack/events`.) 

Then, scroll down to **Subscribe to bot events** to add `app_home_opened` event (Step 3). Then save (Step 4).

![Slack Config](https://api.slack.com/img/api/articles/app_home/events.png)

Similarly, you will need to go to **Features > Interactivity & Actions** to tell Slack where to send interactive payloads Use your Request URL, `https://your-project.glitch.me/slack/actions` then save.

Let’s install the app once. Go to **Install App** and click to install the app to your workspace and follow the screen. 
Once the installation process with OAuth is finished, you should now have your OAuth access tokens on the screen. 

Now, get ready with your Glitch project window in your browser, or IDE. 
This is where your environmental variables are stored. Copy the bot token, which begins with `xoxb`, and paste it into your Glitch project's **.env** file.

Also in the Slack app config page, get your *Signing Secret* key at **Settings > Basic information**, then copy and paste it to the **.env** too.


## Displaying App Home

### Initializing Bolt app

If you are working on Glitch, all dependencies are taken cared already. You can take a look at the `package.json`.

This is how you initialize an app with your credentials:

```js
const { App } = require('@slack/bolt');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

(async () => {
  await app.start(process.env.PORT || 3000);
})();
```

### Handling `app_home_opened` event

To listen to any Events API events from Slack, use the Bolt `event()` method. This allows your app to take action when something happens in Slack. In this scenario, it's triggered when a user opens App Home.

![Slack diagram](https://api.slack.com/img/api/articles/app_home/app_diagram_app_home_opend.png)

The `event()` method requires an eventType of type string, and in this case it is `app_home_opened`.

```js
app.event('app_home_opened', ({ event, say }) => {  
    // display home view
});
```

Now, let’s display a rich content in App Home view with rich message layout, [Block Kit](https://api.slack.com//messaging/composing/layouts):


```js
const result = await app.client.views.publish({
  token: context.botToken,
  user_id: event.user,
  view: updateView
});
```

To display content in the App Home, call `view.publish` method. 

### Constructing the View with Block Kit

In this code example, I am calling another function to create JSON to construct the view to be displayed. This function can be reused when you update the view when new content is added later.

This code snippet shows how to build and display the initial view. 
Notice the `action_id` is specified in the message building block. Use the identifier to grab the data we need:


```js
const updateView = async(user) => {
    let blocks = [ 
    {
      // Section with text and a button
      type: "section",
      text: {
        type: "mrkdwn",
        text: "*Welcome!* \nThis is a home for Stickers app. You can add small notes here!"
      },
      accessory: {
        type: "button",
        action_id: "add_note", 
        text: {
          type: "plain_text",
          text: "Add a Stickie"
        }
      }
    },
    // Horizontal divider line 
    {
      type: "divider"
    }
  ];
  
  let view = {
    type: 'home',
    title: {
      type: 'plain_text',
      text: 'Keep notes!'
    },
    blocks: blocks
  }
  
  return JSON.stringify(view);
};
```

The `blocks` array definied in the code snippet above is [prototyped with Block Kit Builder](https://api.slack.com/tools/block-kit-builder?mode=appHome&view=%7B%22type%22%3A%22home%22%2C%22blocks%22%3A%5B%7B%22type%22%3A%22section%22%2C%22text%22%3A%7B%22type%22%3A%22mrkdwn%22%2C%22text%22%3A%22*Welcome!*%20%5CnThis%20is%20a%20home%20for%20Stickers%20app.%20You%20can%20add%20small%20notes%20here!%22%7D%2C%22accessory%22%3A%7B%22type%22%3A%22button%22%2C%22action_id%22%3A%22add_note%22%2C%22text%22%3A%7B%22type%22%3A%22plain_text%22%2C%22text%22%3A%22Add%20a%20Stickie%22%7D%7D%7D%2C%7B%22type%22%3A%22divider%22%7D%5D%7D).


In the actual source code, the function takes dynamic content where it takes additional content form the interactive button and modal. I’ll explain the part in the later section.


### Triggering a button click from a user 

When a user clicks the button, a modal pops open.

![Slack diagram](https://api.slack.com/img/api/articles/app_home/app_diagram_button_click.png)


```js
app.action('add_note', async ({ body, context, ack }) => {
  ack();
  
  // Open a modal window with forms to be submitted by a user
  // See the next section
  
});
```


### Opening a modal dialog

To open the modal, call `views.open` method. 

```js
app.action('add_note', async ({ body, context, ack }) => {
  ack();
  
  // Open a modal window with forms to be submitted by a user
  const view = openModal();

  const result = await app.client.views.open({
    token: context.botToken,
    trigger_id: body.trigger_id,
    view: view
  });
});
```
Once, a user clicks the button, the API server sends your Request URL a payload of the user action, where it contains `trigger_id`. You need this to open a modal.


And this is how you create form elements (input box and a drop-down menu with a submit button) in a modal view. For this exercise, let’s just make the form simple with a multi-line text input and pick a color.


```js
const openModal = async() => {
  
  const modal = {
    type: 'modal',
    title: {
      type: 'plain_text',
      text: 'Create a stickie note'
    },
    submit: {
      type: 'plain_text',
      text: 'Create'
    },
    blocks: [
      // Text input
      {
        "type": "input",
        "block_id": "note01",
        "label": {
          "type": "plain_text",
          "text": "Note"
        },
        "element": {
          "action_id": "content",
          "type": "plain_text_input",
          "placeholder": {
            "type": "plain_text",
            "text": "Take a note... "
          },
          "multiline": true
        }
      },
      
      // Drop-down menu      
      {
        "type": "input",
        "block_id": "note02",
        "label": {
          "type": "plain_text",
          "text": "Color",
        },
        "element": {
          "type": "static_select",
          "action_id": "color",
          "options": [
            {
              "text": {
                "type": "plain_text",
                "text": "yellow"
              },
              "value": "yellow"
            },
            {
              "text": {
                "type": "plain_text",
                "text": "blue"
              },
              "value": "blue"
            }
          ]
        }
      }
    ]
  };
  
  return modal;
};
```

The code snippet seems long, but as you can see, the code is mostly just constructing a JSON for the form UI! See [how it is built on Block Kit Builder](https://api.slack.com/tools/block-kit-builder?mode=modal&view=%7B%22type%22%3A%22modal%22%2C%22title%22%3A%7B%22type%22%3A%22plain_text%22%2C%22text%22%3A%22Create%20a%20stickie%20note%22%2C%22emoji%22%3Atrue%7D%2C%22submit%22%3A%7B%22type%22%3A%22plain_text%22%2C%22text%22%3A%22Create%22%2C%22emoji%22%3Atrue%7D%2C%22blocks%22%3A%5B%7B%22type%22%3A%22input%22%2C%22block_id%22%3A%22note01%22%2C%22element%22%3A%7B%22type%22%3A%22plain_text_input%22%2C%22placeholder%22%3A%7B%22type%22%3A%22plain_text%22%2C%22text%22%3A%22Take%20a%20note...%20%22%7D%2C%22multiline%22%3Atrue%7D%2C%22label%22%3A%7B%22type%22%3A%22plain_text%22%2C%22text%22%3A%22Note%22%7D%7D%2C%7B%22type%22%3A%22input%22%2C%22element%22%3A%7B%22type%22%3A%22static_select%22%2C%22action_id%22%3A%22color%22%2C%22options%22%3A%5B%7B%22text%22%3A%7B%22type%22%3A%22plain_text%22%2C%22text%22%3A%22yellow%22%7D%2C%22value%22%3A%22yellow%22%7D%2C%7B%22text%22%3A%7B%22type%22%3A%22plain_text%22%2C%22text%22%3A%22blue%22%7D%2C%22value%22%3A%22blue%22%7D%5D%7D%2C%22label%22%3A%7B%22type%22%3A%22plain_text%22%2C%22text%22%3A%22Color%22%7D%7D%5D%7D). 


### Handling the form submission

The submission from a user is handled in the same way the button click from the Home tab was handled.

![Slack diagram](https://api.slack.com/img/api/articles/app_home/app_diagram_modal_submit.png)

When the form in the modal is submitted, a payload is sent to the same endpoint of the action. You can differentiate the submission by checking the `type` in the payload data. (To see the full code, see the [lines 107 - 133 in index.js](https://glitch.com/edit/#!/apphome-demo-note?path=index.js:106:0)):


```js
app.post('/slack/actions', async(req, res) => {
  const { type, user, view } = JSON.parse(req.body.payload);
  else if(type === 'view_submission') {
    res.send(''); // Make sure to respond to the server to avoid an error
    
    const data = {
      note: view.state.values.note01.content.value,
      color: view.state.values.note02.color.selected_option.value
    }
    displayHome(user.id, data);
  }
});

```

### Updating the App Home view

Then append the newly acquired data from the user to the current view block, and rerender the Home tab view using [`views.publish`](https://api.slack.com/methods/views.publish).

In this example app, I am using a simple persistent database with the [`node-json-db`](https://www.npmjs.com/package/node-json-db) module. 
Each time a user adds a new note, the data is pushed to the data array. 
I am creating a new data block in JSON then append to the existing JSON, then display the new view by calling the `views.publish`.


### Trying your app

Now your app should be working. To enable it, go to your Slack workspace, click **Apps** from the sidebar menu, where you should see a list of all installed apps, and click your app. See how App Home work by playing around with the app!

![App home on Slack](https://api.slack.com/img/api/articles/app_home/tada_it_works.png)

## Achieving better user-experiences

I hope this tutorial gave you good ideas on how you can use App Home for your existing app or a whole new app!

This tutorial only covered the fundamental parts of building an App Home experience using `views` methods and the modal, but in the next tutorial, Shay DeWael will explain the design best practices by extending this Stickies App to make it more practical so stay tuned!
