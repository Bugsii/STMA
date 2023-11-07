const connection = require('../config/database'); // for database connection

let counter = 0;
let previousX = 0;
let previousY = 0;
let trackingActive = true;
const smoothingFactor = .5;
let startTime = Date.now();
let screentimeresult = formatTime(counter);

webgazer.getStoredPoints();
document.getElementById('stopTrackingButton').addEventListener('click', () => {
    trackingActive = false;
    swal({
        title:"Screentime Report",
        text: "Your Total Screentime is " + screentimeresult,
        buttons:{
          cancel: false,
          confirm: true
        }
        }).then(isConfirm => {
          updatePositionDisplay(data)
        });
        // connection.query('INSERT INTO screentimeduration', {screentimeduration: counter}, async (err, result) => {
        // if (err) {
        //     console.error("Error inserting timestamp into the database: " + err);
        //     res.status(500).send("Error inserting timestamp into the database.");
        // } else {
        //     console.log("Timestamp saved to the database.");
        //     res.status(200).send("Timestamp saved to the database.");
        // }
        // });
});

document.getElementById('resetTracking').addEventListener('click', () => {
    trackingActive = true; // Re-enable tracking
    counter = 0; // Reset the counter
    startTime = Date.now(); // Reset the start time
});

function PopUpInstruction(){
    swal({
      title:"Screentime Report",
      text: "Your screentime is currently " + formatTime(counter) + " and still recording.",
      buttons:{
        cancel: false,
        confirm: true
      }
    }).then(isConfirm => {
        updatePositionDisplay(data)
    });
}

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    return `${hours} hour${hours !== 1 ? 's' : ''} ${minutes} minute${minutes !== 1 ? 's' : ''}`;
}


function updatePositionDisplay(prediction) {
    if (trackingActive && prediction) {
        const rawX = prediction.x.toFixed(2);
        const rawY = prediction.y.toFixed(2);
        const x = previousX + smoothingFactor * (rawX - previousX);
        const y = previousY + smoothingFactor * (rawY - previousY);

        document.getElementById('positionDisplay').innerText = `Position: (${x.toFixed(2)}, ${y.toFixed(2)})`;

        if (trackingActive) { // Check if tracking is active
            // Calculate the elapsed time in seconds
            const currentTime = Date.now();
            const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);

            // Update the counter and display as a time stamp
            counter = elapsedSeconds;
            const timeString = formatTime(counter);
            document.getElementById('counterDisplay').innerText = timeString;
        }

        previousX = x;
        previousY = y;

        if (counter == 60) {
            PopUpInstruction();
        } else if (counter == 120) {
            PopUpInstruction();
        } else if (counter == 180) {
            PopUpInstruction();
        }
    }
}


// Set up a listener for the webgazer callback
webgazer.setGazeListener(function(data, elapsedTime) {
    if (trackingActive &&  data && data.x !== null && data.y !== null) {
        updatePositionDisplay(data);
    }

    
});

// Set up a function that will read and write screentime data to the database every 5 seconds
// Query the database for updating and inserting data
