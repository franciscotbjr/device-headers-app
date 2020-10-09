import React from 'react';
import { cameraFeatures } from './camera';


export default class App extends React.Component {
  state = {
    persons: []
  }

  render() {
    return (
      <div style={{ marginLeft: '100px' }}>
        <h1>Camera access</h1>
        <div>
          <video autoPlay style={{ maxWidth: '30%', height: 'auto', border: 'solid ', borderWidth: '1px' }}></video>
        </div>
        <div style={{ marginTop: '20px' }}>
          <div style={{ margin: '5px 5px 5px 5px', display: 'inline' }}>
            <button onClick={() => {
              cameraFeatures.open(cameras => {
                console.log(cameras);
              }, 
              cameraError => {
                console.log(JSON.stringify(cameraError));
              });
            }}>Open</button>
          </div>
          <div style={{ margin: '5px 5px 5px 5px', display: 'inline' }}>
            <button onClick={() => {
              cameraFeatures.takeShot('selfie64_1', snapshotError => {
                console.log(JSON.stringify(snapshotError));
              });
            }}>Shot</button>
          </div>
          <div style={{ margin: '5px 5px 5px 5px', display: 'inline' }}>
            <button onClick={cameraFeatures.close}>Close</button>
          </div>
        </div>
      </div>
    )
  }
}
