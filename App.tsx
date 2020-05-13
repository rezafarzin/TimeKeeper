import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';


const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },

  TextStyle: {
    fontSize: 25,
    textAlign: 'center'
  }
});

const App: React.FC = () => {
  const numarray: number[] = [];
  const [count, setCount] = useState(0);
  const [epoch, setEpoch] = useState(0);
  const [stopTimer, setStopTimer] = useState(false);
  const [timerId, setTimerId] = useState(0);
  const [times, setTimes] = useState(numarray);

  useEffect(() => {
    return () => clearInterval(timerId);
  }, [])

  const dateString = (new Date(epoch)).toString();

  const start = () => {
    if (timerId > 0)
      return;

    const startTime = Date.now();
    setTimes([...times, startTime]);

    const newTimerId = setInterval(() => {
      setEpoch(Date.now());
    }, 100);
    setTimerId(newTimerId);
  }

  const stop = () => {
    if (timerId == 0)
      return;
    const endtime = Date.now();
    clearInterval(timerId);
    setTimerId(0);
    setTimes([...times, endtime]);
  }

  return (
    <View style={styles.container}>
      <Text>Hello</Text>
      <Text>Value of count = {count} </Text>
      <Button title="increment" onPress={() => setCount(count + 1)} />
      <Text>Timer = {dateString} </Text>
      <Text>StopTimer = {String(stopTimer)} </Text>
      <Button title="start timer" onPress={() => start()} />
      <Button title="stop timer" onPress={() => stop()} />
      {times.map((item, key) => (
        <Text key={key} style={styles.TextStyle}> {key % 2 == 0 ? "start" : "stop"} {new Date(item).toString()} </Text>)
      )}
    </View>
  );
}

export default App;

