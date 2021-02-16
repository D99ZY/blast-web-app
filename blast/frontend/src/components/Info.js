import React, { useState, useEffect } from 'react';
import { Grid, Button, Typography, IconButton } from '@material-ui/core';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Link } from 'react-router-dom';

const pages = {
    APP: 'pages.app',
    CREATE: 'pages.create',
    JOIN: 'pages.join',
};

// Functional Component
export default function Info(props) {

    const [page, setPage] = useState(pages.APP);

    function renderAppDescription() {

        let title = "What is blast?";
        let content = "With blast you have an easy and fair way of letting your friends choose the music at your party. " + 
            "Simply put on a spotify playlist and let your friends vote when to skip a song.";

        return (
            <Grid container spacing={3} align='center'>
                <Grid item xs={12}>
                    <Typography component='h4' variant='h4'>
                        {title}
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant='body1'>
                        {content}
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <div>
                        <IconButton
                            onClick={() => {
                                setPage(pages.CREATE)
                            }}
                        >
                            {<NavigateNextIcon />}
                        </IconButton>

                        <Typography color="textSecondary" variant='subtitle1'>
                            Page 1 of 3
                        </Typography>
                    </div>
                </Grid>

                <Grid item xs={12}>
                    <Button color='secondary' variant='contained' to='/' component={Link}>
                        Back
                    </Button>
                </Grid>
            </Grid>
        );
    }

    function renderCreateDescription() {

        let title = "Create Room";
        let content1 = "Create a room to start hosting your party. " + 
            "After signing in to your Spotify account, decide how many of your friends need to vote before a song is skipped. " +
            "Additionally, you can choose whether or not your friends are able to pause the music.";
    
        let content2 = "Once your room has been created, simply share your unique 6 letter room code with your friends.";

        return (
            <Grid container spacing={3} align='center'>
                <Grid item xs={12}>
                    <Typography component='h4' variant='h4'>
                        {title}
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant='body1'>
                        {content1}
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant='body1'>
                        {content2}
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <div>
                        <IconButton
                            onClick={() => {
                                setPage(pages.APP)
                            }}
                        >
                            {<NavigateBeforeIcon />}
                        </IconButton>
                        <IconButton
                            onClick={() => {
                                setPage(pages.JOIN)
                            }}
                        >
                            {<NavigateNextIcon />}
                        </IconButton>

                        <Typography color="textSecondary" variant='subtitle1'>
                            Page 2 of 3
                        </Typography>
                    </div>
                </Grid>

                <Grid item xs={12}>
                    <Button color='secondary' variant='contained' to='/' component={Link}>
                        Back
                    </Button>
                </Grid>
            </Grid>
        );
    }

    function renderJoinDescription() {

        let title = "Join Room";
        let content1 = "Once the party host has created a room, just ask for the room code.";
        let content2 = "Join the room using the room code to start taking control of the music!";

        return (
            <Grid container spacing={3} align='center'>
                <Grid item xs={12}>
                    <Typography component='h4' variant='h4'>
                        {title}
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant='body1'>
                        {content1}
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant='body1'>
                        {content2}
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <div>
                        <IconButton
                            onClick={() => {
                                setPage(pages.CREATE)
                            }}
                        >
                            {<NavigateBeforeIcon />}
                        </IconButton>

                        <Typography color="textSecondary" variant='subtitle1'>
                            Page 3 of 3
                        </Typography>
                    </div>
                </Grid>

                <Grid item xs={12}>
                    <Button color='secondary' variant='contained' to='/' component={Link}>
                        Back
                    </Button>
                </Grid>
            </Grid>
        );
    }

    if (page == pages.JOIN) {
        return renderJoinDescription();
    }
    else if (page == pages.CREATE) {
        return renderCreateDescription();
    }
    else {
        return renderAppDescription();
    }
}