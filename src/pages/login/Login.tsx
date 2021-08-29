import React, { useState } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Grid, { GridSpacing } from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Link from '@material-ui/core/Link'
import { useLogin } from './hooks/useLogin'
import { useHistory } from 'react-router'
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginTop: 40,
    },
    button: { width: '50%', marginBottom: 20, marginTop: 40 },
    header: { marginTop: 30, marginBottom: 10 },
    paper: {
      height: 400,
      width: 500,
    },
    usernameInputField: {
      height: 70,
      width: '80%',
    },
    passwordInputField: {
      height: 50,
      width: '80%',
    },
    links: {
      marginBottom: 20,
    },
  })
)

export default function SpacingGrid() {
  const history = useHistory()
  const { login } = useLogin()
  const classes = useStyles()
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isLogging, setIsLogging] = useState<boolean>(false)
  const [requestError, setRequestError] = useState<boolean>(false)
  const preventDefault = (event: React.SyntheticEvent) => event.preventDefault()

  function onChangeUsername(e: React.ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value)
  }

  function onChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value)
  }

  async function handleLoginClick() {
    setIsLogging(true)
    setRequestError(false)
    //valida pass
    //valida login
    try {
      await login(username, password)
      setIsLogging(false)
      history.push('/')
    } catch (e) {
      setIsLogging(false)
      setRequestError(true)
    }
  }

  return (
    <Grid container direction="column" alignItems="center" className={classes.root}>
      <Paper className={classes.paper} elevation={4}>
        <Grid container direction="column" alignItems="center" xs={12} justify="space-between">
          <Typography className={classes.header}>Login</Typography>
          <TextField
            value={username}
            onChange={onChangeUsername}
            id="username-input"
            label="Username"
            className={classes.usernameInputField}
            InputLabelProps={{
              shrink: true,
            }}
            error={requestError}
          />
          <TextField
            id="password-input"
            value={password}
            onChange={onChangePassword}
            label="Password"
            className={classes.passwordInputField}
            type="password"
            InputLabelProps={{
              shrink: true,
            }}
          />
          {isLogging ? (
            <CircularProgress />
          ) : (
            <Button onClick={handleLoginClick} variant="contained" color="primary" className={classes.button}>
              Login
            </Button>
          )}

          <Typography className={classes.links}>
            <Link href="#" onClick={preventDefault}>
              Forgot your password?
            </Link>
          </Typography>
          <Typography className={classes.links}>
            <Link href="#" onClick={preventDefault}>
              Sign up
            </Link>
          </Typography>
        </Grid>
      </Paper>
    </Grid>
  )
}
