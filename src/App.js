import React, { Suspense, useContext } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom";
import { Toaster } from 'react-hot-toast';


import Spinner from './components/Spinner/Spinner';
import AuthContext from './store/AuthContext';
import HomeScreen from './views/Home';
import LoginScreen from './views/Login';
import Footer from './components/Footer';
import MainNav from './components/MainNav';
import ProfileScreen from './views/Profile';

function App() {
	const { isVerifying, isAuthenticated } = useContext(AuthContext);

	if (isVerifying) {
		return (
			<Spinner className="py-6" />
		)
	}

	if (!isAuthenticated){
		return (
			<LoginScreen />
		)
	}

	return (
		<Suspense fallback={
			<div className="container py-5">
				<Spinner className="py-6" />
			</div>
		}>
			<Router forceRefresh={true}>
				<MainNav />

				<Switch>
					<Route path="/profile">
						<ProfileScreen />
					</Route>
					<Route path="/">
						<HomeScreen />
					</Route>
				</Switch>

				<Toaster />
				<Footer />

			</Router>
		</Suspense>
	);
}

export default App;
