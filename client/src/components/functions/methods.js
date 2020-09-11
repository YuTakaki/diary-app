export const openForm = (props, value) => {
    // document.querySelector('.form').classList.toggle('show');
        props.history.push(value)
}
export const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
export const toggleNavBar = () => {
    document.querySelector('nav .nav').classList.toggle('active');
}