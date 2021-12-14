import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

    /**********SIGNUP AND SIGNIN STYLES**********/
    signin:{
        margin: "10vh auto",
        padding: 10,
        height: '80vh',
        width: '30vw',
        backgroundColor: '#ffffff',
        [theme.breakpoints.down('md')]: {
            width: '50vw'
        },
        [theme.breakpoints.down('sm')]: {
            width: '80vw'
        }
    },

    bigLogo: {
        height: '8%',
        width: '10%',
    },

    textField: {
        marginTop: "10px",
        width: '100%',
        height: '5%'
    },

    signup:{
        margin: "5vh auto",
        padding: 10,
        height: '90vh',
        width: '30vw',
        backgroundColor: '#ffffff',
        [theme.breakpoints.down('md')]: {
            width: '50vw'
        },
        [theme.breakpoints.down('sm')]: {
            width: '80vw'
        }
    },

    buttonSignup: {
        marginTop: '2%',
        backgroundColor: '#3284be',
        color: '#ffffff',
        '&:hover': {
            backgroundColor: '#25628d'
        }
    },

    buttonSignin: {
        marginTop: '2%'
    },

    image: {
        marginTop: '5%',
        width: '50vw'
    },
    
    footerSigninButton: {
        backgroundColor: '#4b53bc',
        margin: '5px',
        color: '#ffffff',
        fontWeight: 'bold',
        width: '12vw',
        borderRadius: 0,
        textTransform: 'none',
        border: '2px solid',
        borderColor: '#ffffff',
        '&:hover': {
            backgroundColor: '#363c90',
            borderColor: '#f5f5f5',
        }
    },

    footerSignupButton: {
        backgroundColor: '#ffffff',
        margin: '5px',
        color: '#4b53bc',
        fontWeight: 'bold',
        width: '12vw',
        borderRadius: 0,
        textTransform: 'none',
        border: '2px solid',
        borderColor: '#4b53bc',
        '&:hover': {
            backgroundColor: '#f5f5f5',
            borderColor: '#363c90'
        }
    },

    listIcon: {
        color: '#f5f5f5',
        fontSize: '2rem'
    },

    listText: {
        color: '#f5f5f5',
        padding: '2%',
        fontSize: '2rem',
        fontWeight: 'bold'
    },

}));

export default useStyles;