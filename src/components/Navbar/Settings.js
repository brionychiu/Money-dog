import { useLogout } from '../../hooks/useLogout'
import { Link } from 'react-router-dom'

// components
import settingsIcon from '../img/settings_icon.png'
import expandIcon from '../img/expand_icon.png'
import hoverExpandIcon from '../img/expand_icon_blue.png'
import hoverSettingIcon from '../img/settings_icon_blue.png'
import AccountSetting from '../../pages/AccountSetting/AccountSetting'

// styles 
import styles from './Settings.module.css'

const Settings = () => {
    const { logout } = useLogout()
    
    return ( 
        <div>
            <div>
                <img 
                    className={styles.settingsIcon} 
                    src={settingsIcon} 
                    alt='settings'
                    // onClick={logout}
                    onMouseOver={e => e.currentTarget.src = hoverSettingIcon}
                    onMouseOut={e => e.currentTarget.src = settingsIcon}
                />
                <img 
                    className={styles.expendIcon}
                    src={expandIcon} 
                    alt='expandmore'
                    onMouseOver={e => e.currentTarget.src = hoverExpandIcon}
                    onMouseOut={e => e.currentTarget.src = expandIcon}
                />
                {/* <ul className={styles['settings-menu']}>
                    <Link to="/user/account">
                        <li>帳號設定</li>
                    </Link>
                    <li>重設密碼</li>
                    <li>登出</li>
                </ul> */}
            </div>
        </div>
        
     );
}
 
export default Settings;