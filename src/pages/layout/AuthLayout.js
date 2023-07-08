const AuthLayout = ({children}) => {
    return(
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}>
            {children}
        </div>
    )
}
export default AuthLayout