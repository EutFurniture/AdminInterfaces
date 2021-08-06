import React,{useState} from 'react';
import clsx from 'clsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table} from 'react-bootstrap';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import DoughnutChart from '../../charts/DoughnutChart'
import {Redirect} from "react-router-dom"
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import {Bar, Pie, Doughnut} from 'react-chartjs-2'
import {userData} from "../../charts/dummydata"
import { mainListItems, Logout } from './listItems';
//import {Doughnut} from '../../charts/Doughnut'
//import Adminmain from "../main/Adminmain"
import '../css/Dashboard.css'
import Chart from '../../charts/Chart'
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
    fontSize:40,
    fontWeight:600,
  },
  userimage : {
    height: 60,
    width: 60,
    borderRadius:100,
    borderColor:'white',

  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
   
  },
  custom:{
    display:'flex',
    paddingLeft:'20px',
    
   height:'80px',
   paddingBottom:'10px',
    color:'black',
    fontSize:'20px',
   
  
},
  paper: {
    padding: theme.spacing(1),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 'auto',
  },
  maindash:{
    display:'flex'
  },
  piechart:{
      display:'flex'
  },
  pieleft:{
 width:'400px',
 marginLeft:'100px'
  },
  pieright:{
    width:'400px',
    marginLeft:'300px'
     },
 datesalign:{
  display:'flex'
},
dateleft:{
    marginRight:'100px',
    marginBottom:'20px',
    marginLeft:'30px'
}

}));

const styles = {
  side:{
    backgroundColor:'rgb(37, 37, 94)',
  }
};



const DashboardNew=()=> {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const[isAuth,setIsAuth]=useState(true);

  if(!isAuth){
    return <Redirect to="" />
  }


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar} style={{backgroundColor: 'rgb(37, 37, 94)'}}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            <b>ADMIN</b>
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>

         
          <IconButton color="inherit" fontSize="inherit">
           <AccountCircleIcon   onClick={handleClick}/>
  
          </IconButton>
   <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={()=>setIsAuth(false)}>Logout</MenuItem>
      </Menu>

        </Toolbar>
      </AppBar>
      <div style={styles.side}>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon} style={{backgroundColor: 'rgb(37, 37, 94)', color:'white'}}>
          <IconButton onClick={handleDrawerClose} style={{color:'white'}}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List style={{backgroundColor: 'rgb(37, 37, 94)', color:'white'}}>{mainListItems}</List>
        <Divider />
        <List style={{backgroundColor: 'rgb(37, 37, 94)', color:'red'}} onClick={()=>setIsAuth(false)}>{Logout}</List>
        <Divider />
      </Drawer>
      </div>

      {/* <main className={classes.content}>
      <Adminmain />
        

 </main> */}
 <main style={{backgroundColor: '#f0f8ff'}} className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={1}>
          
            <Grid item xs={12} >
            <Paper className={classes.custom}>
               <h1><b>SYSTEM OVERVIEW</b></h1>
             
               </Paper>  
              <Paper className={fixedHeightPaper}>
                 

                       <div className="cardcollection">
                           <div className="card1">
                               {/* <AttachMoneyIcon style={{fontSize:'50px'}} /> */}
                               <h1>Income</h1>
                               <p>Rs.125,300</p>
                           </div>

                           <div className="card2">
                               <h1>Sales</h1>
                               <p>Rs.100,200</p>
                           </div>

                           <div className="card4">
                               <h1>Customers</h1>
                               <p>300</p>
                           </div>

                           <div className="card3">
                               <h1>Orders</h1>
                               <p>50</p>
                           </div>
                           <div className="card5">
                               <h1>Employees</h1>
                               <p>12</p>
                           </div>
                           <div className="card6">
                               <h1>Products</h1>
                               <p>100</p>
                           </div>
                           <div className="card7">
                               <h1>Delivers</h1>
                               <p>4</p>
                           </div>
                           <div className="card8">
                               <h1>Categories</h1>
                               <p>6</p>
                           </div>
                       </div>
                      <br/>
                       <h1 align='center'>Customer Analytics</h1>
                       <Bar  style={{width:'1100px',marginLeft:'70px'}}
      data={{
        labels:['Jan','Feb','Mar','Apr','May','Jun','July','Aug','Sep','Oct','Nov','Dec'],
        datasets:[{
          label:'No of Customers per month',
          data:[15,10,30,50,35,21,18,20,16,12,33,25],
          backgroundColor:'#4166f5',
          barThickness:18
        },
        
        
        ]
      }}
      options={{
        tooltips:{
          mode:'index',
          callbacks:{
            label:function(toolTipItem){
              return ("Revenue: $"+toolTipItem.value)
            }
          }

        },
        scales:{
          xAxes:[
            {
              gridLines:{
              color:'cyan'
            },
              scaleLabel:{
                labelString:'Months',
                display:true,
                fontColor:'blue',
                fontSize:20
              },
              ticks:{
                fontColor:'green'
              }
            }
          ],
          yAxes:[
          {
            gridLines:{
              color:'cyan'
            },
            scaleLabel:{
                labelString:'Revenue',
                display:true,
                fontColor:'blue',
                fontSize:20,
              },
            ticks:{
              beginAtZero:true,
              fontColor:'green',
              
            }
          }
          ]
        }
      }}
      >

      </Bar>
      

      

                 
               
           
              </Paper>
            </Grid>

            <Grid item xs={12} >
              <Paper className={fixedHeightPaper} >
              <h1 align='center'>Recent Orders</h1>
              <div className={classes.datesalign} display='flex'>
                  <div className={classes.dateleft}>
                  <h3>From Date:</h3>
                   <input style={{backgroundColor:'#abcdef',border:'none', width:'300px',height:'35px',borderRadius:'7px'}} type='date' placeholder='Enter From Date'/>
                  </div>
                  <div  className={classes.dateright}>
                  <h3>To Date:</h3>
                   <input align='right' style={{backgroundColor:'#abcdef',border:'none', width:'300px',height:'35px',borderRadius:'7px'}} type='date' placeholder='Enter From Date'/>
                  </div>
                  
              </div>
             
                     <Table striped bordered hover responsive>
                         <thead className="tableheading">
                         <th>Order Item</th>
                         <th>Customer Name</th>
                         <th>Date</th>
                         <th>Price</th>
                         </thead>
                         <tbody align='center' className="tablebody">
                         <tr>
                             <td>Sofa Set</td>
                             <td>Asvin Mithush</td>
                             <td>2021.07.01</td>
                             <td>Rs.50000</td>
                         </tr>
                         <tr>
                             <td>Cupboard</td>
                             <td>Bala</td>
                             <td>2021.07.04</td>
                             <td>Rs.25000</td>
                         </tr>
                         <tr>
                             <td>Bed Set</td>
                             <td>Mithush</td>
                             <td>2021.07.02</td>
                             <td>Rs.30000</td>
                         </tr>
                         <tr>
                             <td>Table Set</td>
                             <td>Vinthusan</td>
                             <td>2021.06.30</td>
                             <td>Rs.10000</td>
                         </tr>
                         <tr>
                             <td>Dinning Table</td>
                             <td>Santhi</td>
                             <td>2021.07.05</td>
                             <td>Rs.28000</td>
                         </tr>
                         <tr>
                             <td>Track</td>
                             <td>Mathu</td>
                             <td>2021.07.01</td>
                             <td>Rs.5000</td>
                         </tr>
                         <tr>
                             <td>Chairs</td>
                             <td>Vithu</td>
                             <td>2021.06.28</td>
                             <td>Rs.8000</td>
                         </tr>
                         </tbody>
                     </Table>
               
              </Paper>
            </Grid>
            
        
            <Grid item xs={12}  >
              <Paper className={fixedHeightPaper}>
                  <div className={classes.piechart}  display='flex'>
                      <div className={classes.pieleft}>
                          <h1 align='center'>Categories</h1>
              <Pie style={{width:'200px'}}
             
      data={{
        labels:['Table','Chair','Sofa','Dining','Bedset'],
        datasets:[{
          data:[75,100,65,80,50],
          backgroundColor:['green','orange','red','blue','purple'],
        },
        ]
      }
      }
      >

      </Pie>
      </div>
      <div className={classes.pieright}>
      <h1 align='center'>Customized Orders</h1>
              <Pie style={{width:'200px'}}
      data={{
        labels:['Table','Chair','Sofa','Dining','Bedset'],
        datasets:[{
          data:[60,100,70,80,40],
          backgroundColor:['red','orange','purple','blue','green'],
        },
        ]
      }
      }
      >

      </Pie>
      </div>
      </div>
              </Paper>
            </Grid>
            
            <Grid item xs={12} >
              <Paper className={fixedHeightPaper} >
                <Chart  data={userData}  title="Order Analytics" grid dataKey="Orders" />
              </Paper>
            </Grid>
            
          </Grid>

          <Grid item xs={12} >
              <Paper className={fixedHeightPaper}  >
               <DoughnutChart/>
              </Paper>
            </Grid>
            
          
        </Container>
      </main>
    </div>
  );
}

export default DashboardNew;