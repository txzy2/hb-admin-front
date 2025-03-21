import { FadeIn, LeftToRight } from "@/shared/animations";
import { Outlet, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "@radix-ui/themes/styles.css";

import { Header } from "@/components";
import { Loader } from "@/shared/ui";
import { Code, Theme } from "@radix-ui/themes";

/**
 * The Layout component serves as the main structure of the application.
 * It initially displays a loading screen with an animated loader for 4 seconds,
 * after which it reveals the main content including a header, outlet for nested routes,
 * and a footer with creator information and a link to the GitHub repository.
 *
 * @returns {JSX.Element} The rendered Layout component.
 */
const Layout: React.FC = () => {
	const [loader, setLoader] = useState<boolean>(true);
	const currentRoute = useLocation();

	// NOTE: пример подгрузки
	/*const loadComponents = async () => {
    try {
      // Имитируем загрузку компонентов с задержкой
      await Promise.all([
        new Promise((resolve) => setTimeout(resolve, 2000)), // Загрузка Header
        new Promise((resolve) => setTimeout(resolve, 3000)), // Загрузка Footer
        new Promise((resolve) => setTimeout(resolve, 1000)), // Загрузка других компонентов
      ]);

      setLoader(false); // Все компоненты загружены
    } catch (error) {
      console.error('Ошибка при загрузке компонентов:', error);
      setLoader(false); // В случае ошибки всё равно скрываем лоадер
    }
  };*/

	// NOTE: Пока что эмулируем загрузу
	useEffect(() => {
		const timeout = setTimeout(() => {
			setLoader(false);
		}, 4000);

		return () => clearTimeout(timeout);
	}, []);

	if (loader) {
		return (
			<FadeIn delay={0.5}>
				<Loader
					className="h-screen flex items-center justify-center gap-1"
					needSpin={true}
					iconSize={25}
					title={{
						need: true,
					}}
					sub={false}
				/>
			</FadeIn>
		);
	}

	return (
		<Theme
			accentColor="amber"
			grayColor="sand"
			panelBackground="solid"
			appearance="dark"
			radius="medium"
		>
			<div>
				{currentRoute.pathname === "/login" ||
				currentRoute.pathname === "/register" ||
				currentRoute.pathname === "*" ? null : (
					<Header />
				)}

				<div className="w-full">
					<Outlet />
				</div>

				<footer>
					<LeftToRight className="h-[5vh] text-[13px] flex items-center justify-center gap-1">
						<div className="flex items-center gap-1">
							HookahBooking
							<FadeIn delay={1.5}>
								<Code className="font-bold text-orange-400">
									{import.meta.env.VITE_APP_VERSION}
								</Code>
							</FadeIn>
						</div>
					</LeftToRight>
				</footer>
			</div>
		</Theme>
	);
};

export default Layout;
