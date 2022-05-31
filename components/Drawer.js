import React, {useRef, useState} from 'react';
import { View, Text } from "./Themed";
import { DrawerLayoutAndroid } from "react-native-gesture-handler";
import { Button } from 'react-native-web';

export default function Drawer({  }) {
	const drawer = useRef();

	const NavigationView = () => {
		return (
			<View>
				<Text>Hello, I'm a drawer</Text>
			</View>
		);
	}

	return (
		<DrawerLayoutAndroid
		  ref={drawer}
			drawerWidth={200}
			drawerPosition="left"
			renderNavigationView={NavigationView}
		>
			<View>
				<Button
				  onPress={() => drawer.current.openDrawer()}
				/>
			</View>
		</DrawerLayoutAndroid>
	);
}