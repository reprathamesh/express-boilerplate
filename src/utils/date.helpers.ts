import { format as formatDateFns, parseISO } from 'date-fns';

export function formatDate(date: Date | string, fmt = 'yyyy-MM-dd'): string {
    const d = typeof date === 'string' ? parseISO(date) : date;
    return formatDateFns(d, fmt);
}

export function toMonthYear(date: Date | string): string {
    return formatDate(date, 'MM-yyyy');
}

export function toMonthNameYear(date: Date | string): string {
    return formatDate(date, 'MMM yyyy');
}

export function getFinancialYear(date = new Date()): { start: Date; end: Date; label: string } {
    const d = typeof date === 'string' ? parseISO(date) : date;
    const year = d.getFullYear();
    const month = d.getMonth() + 1; // 1-12
    let startYear = year;
    if (month < 4) startYear = year - 1;
    const start = new Date(startYear, 3, 1); // April 1
    const end = new Date(startYear + 1, 2, 31); // March 31 next year
    return { start, end, label: `${startYear}-${startYear + 1}` };
}

export function formatFinancialYearLabel(date = new Date()): string {
    return getFinancialYear(date).label;
}

export function yearsBetween(start: Date | string, end: Date | string): number[] {
    const s = typeof start === 'string' ? parseISO(start) : start;
    const e = typeof end === 'string' ? parseISO(end) : end;
    const years: number[] = [];
    for (let y = s.getFullYear(); y <= e.getFullYear(); y++) years.push(y);
    return years;
}

export default {
    formatDate,
    toMonthYear,
    toMonthNameYear,
    getFinancialYear,
    formatFinancialYearLabel,
    yearsBetween,
};
