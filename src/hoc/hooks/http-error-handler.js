import { useState, useEffect } from 'react';

export default httpClient => {
    const [error, setError] = useState(null);

    // componentDidMount(){
    //didMount commented because now this code is rendered before the JSX is rendered (return)
    const reqInterceptor = httpClient.interceptors.request.use(req => {
        setError(null);
        return req;
    })
    const resInterceptor = httpClient.interceptors.response.use(res => res, err  => {
        setError(err);
    }) 
    // }


    // componentWillUnmount(){
    //WillUnmount is here because if there are too much pages it will create a withErrorHandler for each page
    //useEffect instead of WillUnmount
    useEffect(() => {
        return() => {
            httpClient.interceptors.request.eject(this.reqInterceptor);
            httpClient.interceptors.request.eject(this.resInterceptor);
        }
    }, [reqInterceptor, resInterceptor] )
    // }

    const errorConfirmedHandler = () => {
        setError(null);
    }

    return [error, errorConfirmedHandler];
}
