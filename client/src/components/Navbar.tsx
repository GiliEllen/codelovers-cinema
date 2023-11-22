import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { NavLink, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { logoutUser, userSelector } from './../features/loggedInUser/loggedInUser'
import LogoutIcon from '@mui/icons-material/Logout'
interface Props {
  window?: () => Window
}

const drawerWidth = 240
const navItems = [
  { name: 'Create an account', href: '/register' },
  { name: 'Login', href: '/login' },
]

export default function Navbar(props: Props) {
  const { window } = props
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const user = useAppSelector(userSelector)

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState)
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography
        onClick={() => {
          navigate('/')
        }}
        variant="h6"
        sx={{ my: 2 }}
      >
        Gili's cinema 🎬
      </Typography>
      <Divider />
      {user ? (
        <>
          <Typography>Welcome back {user.firstName}!</Typography>
          <IconButton onClick={() => {dispatch(logoutUser())}}>
            <LogoutIcon />
          </IconButton>
        </>
      ) : (
        <List>
          {navItems.map((item) => (
            <ListItem
              onClick={() => {
                navigate(item.href)
              }}
              key={item.name}
              disablePadding
            >
              <ListItemButton sx={{ textAlign: 'center' }}>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  )

  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Gili's cinema 🎬
          </Typography>
          {user ? (
            <>
              <Typography>Welcome back {user.firstName}!</Typography>
              <IconButton onClick={() => {dispatch(logoutUser())}}>
                <LogoutIcon />
              </IconButton>
            </>
          ) : (
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {navItems.map((item) => (
                <NavLink to={item.href}>
                  <Button key={item.name} sx={{ color: '#fff' }}>
                    {item.name}
                  </Button>
                </NavLink>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  )
}
