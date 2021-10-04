![m7 queue monitoring](https://github.com/pedroalexpf/kh-qm-m7/blob/master/m7-asterisk.png)

# Asterisk queue M7 monitoring
  
This is a simple but very useful script that runs together with the browser, helping to monitor Asterisk service queues.

## Features
Among the main features are:
- Color alert depending on queue traffic;
- Visual alert on the respective affected queues. If a queue reaches more than 7 minutes of waiting (M7 Alert), the alert is triggered.
- Alert indicating the balance of the queue, if necessary.
- Monitoring of movements and service breaks in the queue, with color code.

## How to install

To use the script, you will need to install the **[Tampermonkey](https://www.tampermonkey.net/)** plugin in your browser.

This Plugin is available in following browsers: **Chrome**, **Edge**, **Safari**, **Firefox**, **Opera**, **Dolphin** and **Uc**. Just go to your browser's _extensions_ page and install. If everything goes well, you will see the following icon in the right corner of the screen:

![How to Download and Install User Script on Chrome Using Tampermonkey](https://www.technostarry.com/wp-content/uploads/2013/05/tampermonkey3.jpg)

With the plugin properly installed, we need to activate the script on the page where the [Asterisk](https://pt.wikipedia.org/wiki/Asterisk) queue will work. Therefore:

- Access the Asterisk queue;

- Click on the Tampermonkey icon and go to **Add new script**;

- In the editor screen, you will need to paste the complete script. The code is in the [filamanager.js file](https://github.com/pedroalexpf/kh-qm-m7/blob/master/filamanager.js) of this repository, so copy **all the code** and paste into Tampermonkey;

- Go to File and click Save.

Finally, just refresh the Asterisk queue page and validate the operation. As a result, you will see that the queue information will be highlighted in different colors such as break time, queue analyst availability, Seven Mode, and so on.
```
