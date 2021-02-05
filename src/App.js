import React from "react";
import {Typography, ListItem, List, Grid, Card, IconButton, Avatar, ListItemAvatar, ListItemText, ListItemSecondaryAction, Tooltip, LinearProgress} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import useRestaurants from "./lib/hooks/useRestaurants";
import {QueryClient, QueryClientProvider} from "react-query";
import {Phone, Link} from "@material-ui/icons";
import Rating from "@material-ui/lab/Rating";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
   resultsTableContainer:{
      borderRadius:12,
      paddingTop:40,
      width:'50%',
      margin:'15% auto 50px',
      textAlign:'center',
      '& h4 span':{
         color:'#111'
      }
   },
   resultsTable:{
      maxHeight:400,
      overflowY:'auto'
   },
   alert:{
      maxWidth:500,
      margin:'20px auto 20px'
   }
}));
const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         refetchOnWindowFocus: false,
      },
   },
});
const AppContainer = () => {
   return (
      <>
         <QueryClientProvider client={queryClient}>
            <App/>
         </QueryClientProvider>
      </>
   );
}

function App() {
   const classes = useStyles();
   const requestParams = {
      location: "vegas", // todo - enable ability to change city / term from UI
      term: "coffee",
      limit: 20,
   };
   const restaurantResponse = useRestaurants(requestParams);
   const {data, isFetching} = restaurantResponse;
  return (
    <div className="App">
      <Grid
         container
         spacing={0}
         align="center"
         justify="center"
         direction="column">
            <Card className={classes.resultsTableContainer}>
   <Typography variant={'h4'} color={'textSecondary'}>20 Best <span>Vegas</span> Restaurants</Typography>
               {isFetching ?
                  <>
                  <Typography variant={'h5'} color={'textSecondary'} style={{padding:120}}>
                     Loading Results...
                     <LinearProgress color={"secondary"}/>
                  </Typography>
                   </>
                  :
                  <List className={classes.resultsTable}>
                     {data && data.businesses.map((value) => {
                        const labelId = `checkbox-list-secondary-label-${value}`;
                        return (
                           <ListItem key={value.id} button>
                              <ListItemAvatar>
                                 <Avatar
                                    alt={`Photo from ${value.name}`}
                                    src={value.image_url}
                                 />
                              </ListItemAvatar>
                              <ListItemText id={labelId} primary={`${value.name} - ${value.display_phone}`} secondary={<Rating value={value.rating} readOnly />} />
                              <ListItemSecondaryAction>
                                 <Tooltip title={`Call ${value.name}`} placement={'left'}>
                                 <IconButton onClick={()=>window.location=`tel:${value.phone}`}>
                                       <Phone/>
                                    </IconButton>
                                 </Tooltip>
                                 <Tooltip title={`Visit ${value.name}`} placement={'left'}>
                                 <IconButton onClick={()=>window.open(value.url, "_blank")}>
                                       <Link/>
                                    </IconButton>
                                 </Tooltip>
                              </ListItemSecondaryAction>
                           </ListItem>
                        );
                     })}
                  </List>
               }
               {data===undefined && <Alert severity="info" className={classes.alert}>This is most likely a CORS policy issue, please see project readme.</Alert>}
            </Card>
      </Grid>
    </div>
  );
}

export default AppContainer;
