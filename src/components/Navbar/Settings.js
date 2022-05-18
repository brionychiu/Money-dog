import { useLogout } from '../../hooks/useLogout'

// components
import settingsIcon from '../img/settings_icon.svg'
import expandIcon from '../img/expand_icon.svg'

// styles 
import styles from './Settings.module.css'
const Settings = () => {
    const { logout } = useLogout()
    return ( 
        <>
            <img 
                className={styles.settingsIcon} 
                src={settingsIcon} 
                alt='settings'
                onClick={logout}
            />
            <img 
                className={styles.expendIcon}
                src={expandIcon} 
                alt='expand more'
                onClick={logout}
            />
        </>
        
     );
}
 
export default Settings;