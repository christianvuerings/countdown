import React from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

const TimeInput = props => (
  <TextInput
    editable={true}
    keyboardType="numeric"
    maxLength={2}
    onBlur={props.onBlur}
    onChangeText={props.onTimeChange}
    placeholder="00"
    selectTextOnFocus
    style={styles.timeInput}
    value={props.value}
  />
);

const addPadding = input => ("0" + input).slice(-2);
const convertTimeToSeconds = (minutes, seconds) =>
  parseInt(minutes) * 60 + parseInt(seconds);

export default class App extends React.Component {
  state = {
    inputSeconds: "00",
    inputMinutes: "2",
    currentTime: 0,
    paused: false,
    started: false,
    timerId: 0
  };

  handleSecondsBlur = () => {
    const seconds = parseInt(this.state.inputSeconds || 0);
    const outputSeconds = seconds > 59 ? 0 : seconds;
    this.handleSecondsChange(addPadding(outputSeconds));
  };

  handleMinutesBlur = () => {
    // this.handleMinutesChange(parseInt(this.state.inputMinutes));
  };

  handleSecondsChange = seconds => {
    this.setState({ inputSeconds: seconds });
  };

  handleMinutesChange = minutes => {
    this.setState({ inputMinutes: minutes || "" });
  };

  handlePressStart = () => {
    this.setState({ started: true });
    this.timerStart();
  };

  handlePressReset = () => {
    this.setState({ started: false });
    this.timerStop();
  };

  timerStart = () => {
    const currentTime = convertTimeToSeconds(
      this.state.inputMinutes,
      this.state.inputSeconds
    );
    const timerId = setInterval(this.timerTick, 1000);
    this.setState({ currentTime, timerId });
  };

  timerStop = () => {
    clearInterval(this.state.timerId);
  };

  timerTick = () => {
    if (this.state.currentTime === 0) {
      // play sound
      this.timerStop();
      this.setState({ ...this.state, started: false, paused: false });
    } else {
      this.setState({ ...this.state, currentTime: this.state.currentTime - 1 });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {!this.state.started &&
          <View style={styles.timeInputs}>
            <TimeInput
              value={this.state.inputMinutes}
              onTimeChange={this.handleMinutesChange}
              onBlur={this.handleMinutesBlur}
            />
            <TimeInput
              value={this.state.inputSeconds}
              onTimeChange={this.handleSecondsChange}
              onBlur={this.handleSecondsBlur}
            />
          </View>}
        {this.state.started &&
          <View>
            <Text style={styles.counter}>{this.state.currentTime}</Text>
          </View>}
        <View style={styles.buttons}>
          {!this.state.started &&
            <TouchableOpacity
              style={[styles.button, styles.buttonPrimary]}
              onPress={this.handlePressStart}
            >
              <Text style={styles.buttonText}>Start</Text>
            </TouchableOpacity>}
          {this.state.started &&
            <TouchableOpacity
              style={[styles.button, styles.buttonWarning]}
              onPress={this.handlePressReset}
            >
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>}
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: 100,
    flex: 0,
    height: 100,
    justifyContent: "center",
    margin: 5,
    padding: 10,
    width: 100
  },
  buttonPrimary: {
    backgroundColor: "#2BBBAD"
  },
  buttonWarning: {
    backgroundColor: "#CC4A51"
  },
  buttonText: {
    color: "#fff"
  },
  buttons: {
    flex: 0,
    flexDirection: "row",
    marginTop: 50
  },
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center",
    marginTop: 50,
    flex: 1
  },
  counter: {
    fontSize: 50
  },
  timeInput: {
    borderColor: "gray",
    borderBottomWidth: 1,
    fontSize: 50,
    marginLeft: 5,
    marginRight: 5,
    textAlign: "right"
  },
  timeInputs: {
    flex: 0,
    flexDirection: "row"
  }
});
