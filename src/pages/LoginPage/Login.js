import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLogin } from '../../hooks/useLogin'

//styles
import styles from './Login.module.css'

//components
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'

const Login = () => {
    const [ email , setEmail ] = useState('')
    const [ password , setPassword ] = useState('')
    const { googleLogin, fbLogin, login, error, isPending } = useLogin()

    const handleSubmit = (e) => {
        e.preventDefault()
        login(email,password)
    }

    return ( 
        <>
            <Navbar />
            <form onSubmit={handleSubmit} className={styles['login-form']}>
                <h2>登入招財狗</h2>
                {error && <div className={styles.error}>{error}</div>}
                <div className={styles.container}>
                    <div className={styles.quickPass}>
                        <div className={styles.googleLogin} onClick={googleLogin}>Google快速登入</div>
                        <div className={styles.fbLogin} onClick={fbLogin}>Facebook快速登入</div>
                    </div>
                    <div className={styles.separate}>
                        <div className={styles.headline}>或用Email登入</div>
                    </div>
                    <label className={styles.email}>
                        <div>輸入您的Email帳號：</div>
                        <input 
                            type='email'
                            size='40'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <label className={styles.password}>
                        <div>輸入您的密碼：</div>
                        <input 
                            type='password'
                            size='36'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    {!isPending && <button className={styles.submitBtn}>Email登入</button>}
                    {isPending && <button className={styles.submitBtn} disabled>請稍等...登入中</button>}
                </div>
                <Link className={styles.signup} to="/signup">註冊新帳號</Link>
            </form>         
            <Footer />
        </>

    );
}
 
export default Login;