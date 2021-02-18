import React, { Component } from "react";
import {
    Grid,
    Typography,
    Card,
    IconButton,
    LinearProgress,
} from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import SkipNextIcon from "@material-ui/icons/SkipNext";


export default class MusicPlayer extends Component {
    constructor(props) {
        super(props);
    }

    pauseSong() {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'applications/json' },
        };
        fetch('/spotify/pause', requestOptions);
    }

    playSong() {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'applications/json' },
        };
        fetch('/spotify/play', requestOptions);
    }

    skipSong() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'applications/json' },
        };
        fetch('/spotify/skip', requestOptions);
    }

    renderDefault() {

        var screenWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;

        let cardStyle;

        if (screenWidth < 960) {
            cardStyle = {
                width: '80vw',
            }
        }
        else {
            cardStyle = {
                width: '40vw',
            }
        }

        return (

            <Card style={cardStyle} variant="outlined">
                <Grid container alignItems="center">

                    <Grid item align="center" xs={4}>
                        <img src={"/static/images/no_song.png"} height="100%" width="100%" />
                    </Grid>

                    <Grid item align="center" xs={8}>

                        <Typography component="h5" varient="h5">
                            {"No Song Selected"}
                        </Typography>

                        <Typography color="textSecondary" varient="subtitle1">
                            {"Start playing a song on Spotify"}
                        </Typography>

                        <div>
                            <IconButton>
                                {<PlayArrowIcon />}
                            </IconButton>
                            <IconButton>
                                <SkipNextIcon />
                            </IconButton>
                        </div>

                    </Grid>

                </Grid>

                <LinearProgress variant="determinate" value={0} />

            </Card>
            
        );

    }

    render() {

        if (this.props.title == null) {
            return this.renderDefault()
        }

        const songProgress = (this.props.time / this.props.duration) * 100;

        var screenWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;

        let cardStyle;

        if (screenWidth < 960) {
            cardStyle = {
                width: '80vw',
            }
        }
        else {
            cardStyle = {
                width: '40vw',
            }
        }

        return (
            <Card style={cardStyle} variant="outlined">
                <Grid container alignItems="center">

                    <Grid item align="center" xs={4}>
                        <img src={this.props.image_url} height="100%" width="100%" />
                    </Grid>

                    <Grid item align="center" xs={8}>

                        <Typography component="h5" varient="h5">
                            {this.props.title}
                        </Typography>

                        <Typography color="textSecondary" varient="subtitle1">
                            {this.props.artist}
                        </Typography>

                        <div>
                            <IconButton
                                onClick={() => {
                                    this.props.is_playing ? this.pauseSong() : this.playSong()
                                }}
                            >
                                {this.props.is_playing ? <PauseIcon /> : <PlayArrowIcon />}
                            </IconButton>
                            <IconButton onClick={() => { this.skipSong() }}>
                                <SkipNextIcon />
                            </IconButton>
                            <Typography color="textSecondary" varient="subtitle1">
                                {this.props.votes} / {this.props.votes_needed}
                            </Typography>
                        </div>

                    </Grid>

                </Grid>

                <LinearProgress variant="determinate" value={songProgress} />

            </Card>
        );
    }
}