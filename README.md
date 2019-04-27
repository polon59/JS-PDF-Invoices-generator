# JS-PDF-Invoices-generator
Application for creating and downloading invoices (Used technologies : React+Material-UI, NodeJS + ExpressJS + MySQL)

It's an application where user can create invoices which are stored in database, 
download them in PDF and display statistics charts about income, best customers, most lucrative services and more.
Application can also work in offline mode - then all changes are temporarly saved in Local Storage 
and automatically sent to server after connection is recovered. Used technologies: React, Node.JS + ExpressJs, MySQL

Invoices list:<br />
![inv list](https://user-images.githubusercontent.com/34944174/56097761-fb264380-5ef8-11e9-80fa-26c3bb4c134a.png)

Invoice editing panel:<br />
![eidtInvoice](https://user-images.githubusercontent.com/34944174/56097774-0b3e2300-5ef9-11e9-96b2-48b76cbd343a.png)

View invoice panel/ PDF downloadable content:<br />
![viewinvoice](https://user-images.githubusercontent.com/34944174/56097781-24df6a80-5ef9-11e9-9bf7-0637b3426bd3.png)

On 'statistics' page user can select year from list, and display charts about created invoices, done services, income net, income gross, most lucrative services and best customers (for each month in selected year):

![statistics](https://user-images.githubusercontent.com/34944174/56097830-a931ed80-5ef9-11e9-8ab5-c3d0d9fb228c.png)
![statistics2](https://user-images.githubusercontent.com/34944174/56097834-b2bb5580-5ef9-11e9-9578-b0f4b1664d38.png)

#### Working in offline mode:

If during work connection will be interrupted, all changes like new invoices, changes on existing invoices or deletions will be saved in Local Storage instead of database. If invoice is saved locally, it's icon on "Invoices List' page changes color from green to orange, and warning snackbar appears in bottom-left corner:<br />
![offline 1](https://user-images.githubusercontent.com/34944174/56097930-d0d58580-5efa-11e9-8830-5826a23597c4.png)

All changes saved locally will be automatically sent to database after connection is recovered, and offline invoices icons will change color from orange to green.
You can also run application without connection with database server, and add, update, delete and download Your invoices. The only difference is that You will only have access to invoices saved locally. In that case You will see red snackbar with this information in bottom-left corner:<br />
![offline2](https://user-images.githubusercontent.com/34944174/56098051-63c2ef80-5efc-11e9-84f1-26aab6499319.png)

Please keep in mind, that this project is still under construction ;)
