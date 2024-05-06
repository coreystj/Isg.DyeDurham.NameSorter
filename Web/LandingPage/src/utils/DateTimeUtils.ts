export class DateTimeUtils {
    public static GetFriendlyDate(currentDate: Date) {
        var now = new Date();
        var difference: number = now.getTime() - new Date(currentDate).getTime();

        var totalDays: number = difference / (1000 * 3600 * 24);
        var totalHours: number = totalDays * 24;
        var totalMinutes: number = totalHours * 60;
        var totalSeconds: number = totalMinutes * 60;

        var totalWeeks: number = totalDays / 7;
        var totalMonths: number = totalDays / 30;
        var totalYears: number = totalDays / 365;

        var result: string = "";

        if (totalSeconds < 60) {
            if (totalSeconds <= 1)
                result = "Less than 1 second ago";
            else if (Math.round(totalSeconds) == 1)
                result = Math.round(totalSeconds) + " second ago";
            else
                result = Math.round(totalSeconds) + " seconds ago";
        }
        else if (totalMinutes < 60)
        {
            if (totalMinutes <= 1)
                result = "Less than 1 minute ago";
            else if (Math.round(totalMinutes) == 1)
                result = Math.round(totalMinutes) + " minute ago";
            else
                result = Math.round(totalMinutes) + " minutes ago";
        }
        else if (totalHours < 24) {
            if (totalHours <= 1)
                result = "Less than 1 hour ago";
            else if (Math.round(totalHours) == 1)
                result = Math.round(totalHours) + " hour ago";
            else
                result = Math.round(totalHours) + " hours ago";
        }
        else if (totalDays < 7){
            if (Math.round(totalDays) <= 0)
                result = "Today";
            else if (Math.round(totalDays) == 1)
                result = "Yesterday";
            else if (Math.round(totalDays) <= 7)
                result = Math.round(totalDays) + " days ago";
        }
        else if (totalDays <= 31) {
            if (Math.round(totalWeeks) == 1)
                result = Math.round(totalWeeks) + " week ago";
            else
                result = Math.round(totalWeeks) + " weeks ago";
        }
        else if (Math.round(totalMonths) < 12) {
            if (Math.round(totalMonths) == 1)
                result = Math.round(totalMonths) + " month ago";
            else
                result = Math.round(totalMonths) + " months ago";
        }
        else {
            if (Math.round(totalYears) == 1)
                result = Math.round(totalYears) + " year ago";
            else
                result = Math.round(totalYears) + " years ago";
        }

        // if (totalDays <= 1) {
        //     result += ", " + DateTimeUtils.FormatTime(currentDate, "en-US");
        // }
        // else {
        //     result += ", " + DateTimeUtils.FormatDate(currentDate, "en-US");
        // }
        return result;
    }

    /**
     * 
     * Adds days to a datetime and returning a new object.
     * 
     * @param {any} originalDate - The date to add days to.
     * @param {any} days - The total amount of days to be added.
     */
    public static AddDays(originalDate: Date, days: number) {
        var cloneDate = new Date(originalDate.valueOf());
        cloneDate.setDate(cloneDate.getDate() + days);
        return cloneDate;
    }

    /**
     * Formats the time using localization.
     * @param {any} currentDate - The date to be formatted.
     * @param {any} localization - The language localization to be used.
     */
    public static FormatTime(currentDate: Date, localization: string) {
        var options: any = {
            hour: '2-digit', minute: '2-digit'
        };

        return new Date(currentDate).toLocaleTimeString(localization, options);
    }

    /**
     * Formats the date using localization.
     * @param {any} currentDate - The date to be formatted.
     * @param {any} localization - The language localization to be used.
     */
    public static FormatDate(currentDate: Date, localization: string) {
        var options: any = {
            year: 'numeric', month: 'long',
            day: 'numeric'
        };

        return new Date(currentDate).toLocaleDateString(localization, options);
    }

    /**
     * 
     * Retrieves the month as a short month.
     * 
     * @param {any} localization - The associated localization to be loaded.
     * @param {any} datetime - The datetime to be converted.
     */
    public static GetShortMonth(localization: string, datetime: Date) {
        var month = datetime.toLocaleString(localization, { month: 'short' });

        return month;
    }


    /**
     * 
     * Retrieves the number date of the datetime.
     * 
     * @param {any} datetime - The datetime to be converted.
     */
    public static GetDate(datetime: Date) {
        var date = datetime.getDate();

        return date;
    }

    /**
     *
     * Retrieves the short month and number date of the datetime.
     *
     * @param {any} datetime - The datetime to be converted.
     */
    public static GetShortDate(datetime: Date) {
        var shortMonth = DateTimeUtils.GetShortMonth("en-US", datetime);
        var date = DateTimeUtils.GetDate(datetime);

        return shortMonth + " " + date;
    }
}