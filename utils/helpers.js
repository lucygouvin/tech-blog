module.exports = {
    checkAuthor: (currentUser, author) => currentUser === author,
    format_date: (date) => date.toLocaleDateString(),
};
