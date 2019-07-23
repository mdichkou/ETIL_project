import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { userService } from '../components/user.service';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'© 2019 Copyright:'}
      <Link color="inherit" href="https://1337.ma/">
        1337
      </Link>
    </Typography>
  );
}
function withMyHook(Component) {
    return function WrappedComponent(props) {
        const useStyles = makeStyles(theme => ({
            '@global': {
              body: {
                backgroundColor: theme.palette.common.white,
              },
            },
            paper: {
              marginTop: theme.spacing(8),
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            },
            avatar: {
              margin: theme.spacing(1),
              backgroundColor: theme.palette.secondary.main,
            },
            form: {
              width: '100%', // Fix IE 11 issue.
              marginTop: theme.spacing(1),
            },
            submit: {
              margin: theme.spacing(3, 0, 2),
            },
          }));
      return <Component {...props} myHookValue={useStyles} />;
    }
  }


class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        userService.logout();

        this.state = {
            username: '',
            password: '',
            submitted: false,
            loading: false,
            error: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password, returnUrl } = this.state;

        // stop here if form is invalid
        if (!(username && password)) {
            return;
        }

        this.setState({ loading: true });
        if(userService.login(username, password))
        {
            const { from } = this.props.location.state || { from: { pathname: "/" } };
            this.props.history.push(from);
        }      
        else
            this.setState({ loading: false })
               
    }
render () {
    const classes = this.props.myHookValue;
    const { username, password, submitted, loading, error } = this.state;
    return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper} style={ {marginTop:"100px"}}>
              <span  align="center">
            <img   className="mx-auto d-block "  width="100px" src={require("../images/logo.png")}/>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
              </span>
            <form name="form" onSubmit={this.handleSubmit} className={classes.form} noValidate>
            <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="username"
                label="Username"
                type="text"
                id="username"
                autoComplete="current-password"
                value={username} onChange={this.handleChange}
              />
              </div>
              <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password} onChange={this.handleChange}
              />
              </div>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
              {error &&
                        <div className={'alert alert-danger'}>{error}</div>
                    }
            </form>
          </div>
          <Box mt={5}>
            <Copyright />
          </Box>
        </Container>
      );
} 
}
LoginPage = withMyHook(LoginPage);
export { LoginPage };
