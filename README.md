# Slack App Home Demo 
Leveraging the App Home feature


_Updated: January, 2020_<br>
_Published October, 2019_

---

There are two code samples to achieve the same app: 
- The sample code with Node w/ Express: [https://glitch.com/edit/#!/apphome-demo-note](https://glitch.com/edit/#!/apphome-demo-note)
- The sample code with Slack **Bolt**: this repo

![hero image](https://a.slack-edge.com/d60e7/img/api/articles/app_home/demo_apphome_static.png)

---

## Full Tutorial with Step-by-step Instruction

See `docs/tutorial.md` in this project

---
---

## Simplified Instruction

### Slack App Config

Go to https://api.slack.com/apps to create a new app. 

- App Home
  - Enable Home Tab
  - Enable Message (if your app takes DM from users)
  
- Enable Bot user

- Add appropriate bot scope(s)
  - `chat.write` (*Note: you actually do not need this scope for this sample app, but do need to add one to be able to install the app!*)

- Enable Events
  - Request URL should be `https://your-project.glitch.me/slack/events`
  - Subscribe to workspace events
  - Add `app_home_opened`
  - Save
  
- Go to **Interactivity & Actions** and enable
  - Reuest URL should be: `https://your-project.glitch.me/slack/actions`
  - Save
  
  
On Slack client:
  - Click the app name to go to the home tab
  - Click the "Add a stickie" button and see what happens!
  