import React, { useState, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { AppBar, Typography, Toolbar, Button, Avatar } from '@material-ui/core'
import useStyles from './styles'
import { useDispatch } from 'react-redux'
import decode from 'jwt-decode'


import instaslut from '../../images/mickey-mouse-fuck-logo.png'

export const Navbar = () => {
   const classes = useStyles()
   const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
   const dispatch = useDispatch()
   const history = useHistory()
   const location = useLocation()

   const logout = () => {
      dispatch({ type: 'LOGOUT' })

      history.push('/auth')

      setUser(null)
   }

   useEffect(() => {
      const token = user?.token

      if (token) {
         const decodedToken = decode(token)

         if (decodedToken.exp * 1000 < new Date().getTime()) logout()
      }

      setUser(JSON.parse(localStorage.getItem('profile')))
   }, [location, user?.token])

   return (
      <AppBar className={classes.appBar} position="static" color="inherit" >
         <div className={classes.brandContainer}>
            <Typography className={classes.heading} component={Link} to="/" variant="h2" align="center" >InstaSlut</Typography>
            <img className={classes.image} src={instaslut} alt="instaslut" height="60" />
         </div>
         <Toolbar className={classes.toolbar}>
            {user ? (
               <div className={classes.profile}>
                  <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                  <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                  <Button variant="contained" className={classes.logout} onClick={logout} color="secondary">Déconnexion</Button>
               </div>
            ) : (
               <Button component={Link} to="/auth" variant="contained" color="primary">Connexion</Button>
            )
            }
         </Toolbar>
      </AppBar>
   )
}
