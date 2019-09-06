const React = require('react')
const ms = require('millisec')
class Timer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            time: 0,
            isOn: false,
            start: 0,
            plus: "+",
            minus: "-",
            delay: 1500000,
        }
        this.startTimer = this.startTimer.bind(this)
        this.stopTimer = this.stopTimer.bind(this)
        this.resetTimer = this.resetTimer.bind(this)
        this.plusTimer = this.plusTimer.bind(this)
        this.minusTimer = this.minusTimer.bind(this)
    }
    startTimer() {
        this.setState({
            isOn: true,
            time: this.state.time,
            start: Date.now() - this.state.time
        })
        this.timer = setInterval(() => this.setState({
            time: Date.now() - this.state.start
        }), 1);
    }
    plusTimer() {
        this.state.isOn == false
            ? this.setState(prefState => ({
                delay: prefState.delay + 300000,
            }))
            : null;
    }
    minusTimer() {
        this.state.isOn == false
            ? this.setState(prefState => ({
                delay: prefState.delay - 300000,
            }))
            : null;
    }
    stopTimer() {
        this.setState({ isOn: false })
        clearInterval(this.timer)
    }
    resetTimer() {
        this.setState({ time: 0, isOn: false })
    }
    timerfunction() {
        var newCount = this.state.currentCount - 1;
        if (newCount >= 0) {
            this.setState({ currentCount: newCount });
        } else {
            clearInterval(this.state.intervalId);
        }
    }
    render() {
        let plus = (this.state.time == 0) ?
            <button class="startButton" onClick={this.plusTimer}>+</button> :
            null
        let minus = (this.state.time == 0) ?
            <button onClick={this.minusTimer}>-</button> :
            null
        let start = (this.state.time == 0) ?
            <button onClick={this.startTimer}>start</button> :
            null
        let stop = (this.state.time == 0 || !this.state.isOn) ?
            null :
            <button onClick={this.stopTimer}>stop</button>
        let resume = (this.state.time == 0 || this.state.isOn) ?
            null :
            <button onClick={this.startTimer}>resume</button>
        let reset = (this.state.time == 0 || this.state.isOn) ?
            null :
            <button onClick={this.resetTimer}>reset</button>
        return (
            <div>
                <h3>timer: {ms(this.state.delay - this.state.time).format("mm : ss")}</h3>
                {start}
                {resume}
                {stop}
                {reset}
                {plus}
                {minus}
            </div>
        )
    }
}
module.exports = Timer



