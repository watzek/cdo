## About this project
The Corps of Discovery Online Atlas is a digital map of the historic route of
the Lewis & Clark Expedition. This atlas builds on the considerable past work of
mapping the expedition both in digital and analog environments. The resource is
intended to harness current web technology to help anyone studying the
expedition understand its physical trajectory and identify the locations of
major events along the way. It is also intended as an easy to use reference for
students learning about the history of the expedition as well as a handy tool
for general readers with interest in the topic.

## Technical Details
This project is written in [React](https://reactjs.org), and relies on the [React-Leaflet library](https://react-leaflet.js.org) for mapping. The database with all the waypoints can be found on [Airtable](https://airtable.com/appNr9GTJe3BAOfph/api/docs#curl/introduction).

The source is broken down into four folders, which contain most of the code. If you're making small changes, you'll need to look there.
The MainWindow folder contains most of the code for controlling the MapPane, Sidebar, and Topbar at a high level. All the map and leaflet code is contained inside the MapPane folder.
The Sidebar folder takes care of the popup whenever a waypoint is clicked.
The TopBar solder contains all the code for the bar at the top of the page, as well as the info/credits popup.
Each folder has all the necessary styles in it as well.

Happy coding!

## Basic steps for S3 deployment
* clone repo
* npm install
* npm run build
* deploy contents of build folder to S3 bucket
* properties -> Static Web site hosting - enable it.
* permissions -> bucket policy - use something like this:
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::cdo-map/*"
        }
    ]
}
```
