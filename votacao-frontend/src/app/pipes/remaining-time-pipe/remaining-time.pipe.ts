import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'remainingTime',
    standalone: true,
})
export class RemainingTimePipe implements PipeTransform {

    transform(seconds: number): string {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = Math.floor(seconds % 60);

        let result = '';
        if (hours > 0) {
            result += `${hours.toString().padStart(2, "0")}:`;
        }
        if (minutes > 0) {
            result += `${minutes.toString().padStart(2, "0")}:`;
        }
        if (remainingSeconds > 0) {
            result += `${remainingSeconds.toString().padStart(2, "0")}`;
        }

        return result.trim();
    }

}
