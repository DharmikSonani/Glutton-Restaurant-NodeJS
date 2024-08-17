export const navigationToNavigate = (navigation, screen) => {
    return navigation.navigate(screen);
}

export const navigationToReplace = (navigation, screen) => {
    return navigation.replace(screen);
}

export const navigationToReset = (navigation, screen) => {
    return navigation.reset({
        index: 0,
        routes: [{ name: screen }],
    });
}