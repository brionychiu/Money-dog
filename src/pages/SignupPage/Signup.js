import { useState } from 'react'
import { Link } from 'react-router-dom' 
import { useLogin } from '../../hooks/useLogin'
import { useSignup } from '../../hooks/useSignup'

// components
import logoIcon from '../../components/Img/logo_icon.jpg'

//styles
import styles from './Signup.module.css'

const Signup = () => {
    const [ email , setEmail ] = useState('')
    const [ password , setPassword ] = useState('')
    const [ confirmPassword , setConfirmPassword ] = useState('')
    const { signup, isPending, error } = useSignup()
    const { googleLogin, fbLogin } = useLogin()

    const handleSubmit = (e) => {
        e.preventDefault()
        signup(email, password, confirmPassword)
    }

    return ( 
        <form onSubmit={handleSubmit}  className={styles['signup-form']}>
            <img className={styles.logo} src={logoIcon} alt='logo'/>
            <h2>馬上加入招財狗 !</h2>
            {error && <div className={styles.error}>{error}</div>}
            <div className={styles.container}>
                <div className={styles.googleSignin} onClick={googleLogin}>Google快速註冊</div>
                <div className={styles.fbSignin} onClick={fbLogin}>Facebook快速註冊</div>
                <div className={styles.separate}>
                    <div className={styles.headline}>或用Email登入</div>
                </div>
                <label className={styles.email}> 
                    <div>輸入Email作為您的帳號</div>
                    <input 
                        type='email'
                        size='40'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                </label>
                <label className={styles.password}>
                    <div>密碼：至少6個字母，英文、數字皆可</div>
                    <input 
                        type='password'
                        size='36'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <label className={styles.confirmPassword}>
                    <div>請再輸入一次密碼</div>
                    <input 
                        type='password'
                        size='36'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </label>
                {!isPending && <button className={styles.submitBtn}>註冊新帳號</button>}
                {isPending && <button className={styles.submitBtn} disabled>請等候...註冊中</button>}
                <Link className={styles.login} to="/login">登入招財狗</Link>
            </div>
        </form>
     );
}
 
export default Signup;