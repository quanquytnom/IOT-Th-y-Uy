import mqtt from 'mqtt';
import { db } from "../index.js";
import { saveDataSensor } from '../controllers/dataSensor.js';

const mapDeviceControl = (deviceName, action) => {
    const deviceMapping = {
        'Fan': { 'on': 'on_fan', 'off': 'off_fan' },
        'Light': { 'on': 'on_light', 'off': 'off_light' },
        'AC': { 'on': 'on_ac', 'off': 'off_ac' },
        'Television': { 'on': 'on_tv', 'off': 'off_tv' },
    };

    return deviceMapping[deviceName]?.[action] || null;
};


// const mqttOptions = {
//     host: "172.20.10.3",
//     port: 1883,
//     username: process.env.MQTT_USERNAME,
//     password: process.env.MQTT_PASSWORD,
//     rejectUnauthorized: false
// }

// secure connect
const mqttClient = mqtt.connect('mqtt://172.20.10.3:1883', {
    username: 'quan',
    password: '2210'
})

//khi ket noi toi mqtt broker
mqttClient.on('connect', () => {
    console.log('Connected to MQTT broker');

    // Listen to the topic "topic/sensorData" to receive data from the sensor
    mqttClient.subscribe('topic/sensorData', (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Subscribed to topic/sensorData ');
        }
    });

    //
    mqttClient.on('message', (topic, message) => {
        if (topic === 'topic/sensorData') {
            const data = JSON.parse(message.toString());
            // console.log(data);
            saveDataSensor(data);
        }
    });

    // Publish the received data from POST request to the topic "topic/actionHistory"\

});

export const publishDeviceControl = (deviceName, action) => {
    const mappedAction = mapDeviceControl(deviceName, action);
    if (mappedAction) {
        mqttClient.publish('topic/action', mappedAction, (err) => {
            if (err) console.error('MQTT Publish Error:', err);
            else console.log(`Published: ${mappedAction}`);
        });
    } else {
        console.log('Invalid action or device');
    }
};

export default mqttClient;