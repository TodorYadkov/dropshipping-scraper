export const formatDateToTimeAgo = (isoDateString) => {                                            // This function formats a given ISO date string into a human-readable time ago representation
    const currentDate = new Date();                                                                     // Get the current date                                                                   
    const inputDate = new Date(isoDateString);                                                          // Parse the input date from the ISO date string
    const timeDifference = currentDate - inputDate;                                                     // Calculate the time difference between the current date and the input date

    const seconds = Math.floor(timeDifference / 1000);                                                  // Convert time difference to seconds
    const minutes = Math.floor(seconds / 60);                                                           // Convert time difference to minutes
    const hours = Math.floor(minutes / 60);                                                             // Convert time difference to hours
    const days = Math.floor(hours / 24);                                                                // Convert time difference to days
    const years = Math.floor(days / 365);                                                               // Convert time difference to years

    if (years > 0) {                                                                                    // Return time ago representation
        return `${years} year${years === 1 ? '' : 's'}`;

    } else if (days > 0) {
        return `${days} day${days === 1 ? '' : 's'}`;

    } else if (hours > 0) {
        return `${hours} hour${hours === 1 ? '' : 's'}`;

    } else if (minutes > 0) {
        return `${minutes} minute${minutes === 1 ? '' : 's'}`;

    } else if (seconds > 0) {
        return `${seconds} second${seconds === 1 ? '' : 's'}`;
        
    } else {
        return 'Not updated yet';
    }
};