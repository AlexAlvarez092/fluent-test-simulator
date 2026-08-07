export function parseBody(request: any) {
    if (request.body && request.body.data) {
        return request.body.data;
    }

    if (request.body && request.body.dataString) {
        return JSON.parse(request.body.dataString);
    }

    return {};
}

export function toBoolean(value: any) {
    if (typeof value === 'string') {
        const normalized = value.trim().toLowerCase();
        return normalized === 'true' || normalized === '1';
    }

    return value === true || value === 1;
}

export function getQueryParam(request: any, name: string): string | undefined {
    const raw = request?.queryParams?.[name];

    if (raw !== undefined && raw !== null) {
        if (typeof raw === 'object') {
            if (Array.isArray(raw) && raw.length > 0) {
                return String(raw[0]);
            }

            if ('value' in raw) {
                return String(raw.value);
            }
        }

        return String(raw);
    }

    if (typeof request?.getQueryParameter === 'function') {
        const value = request.getQueryParameter(name);
        if (value !== undefined && value !== null) {
            return String(value);
        }
    }

    if (typeof request?.getParameter === 'function') {
        const value = request.getParameter(name);
        if (value !== undefined && value !== null) {
            return String(value);
        }
    }

    return undefined;
}

export function parseGlideList(value: string | null): string[] {
    if (!value) {
        return [];
    }

    return value
        .split(',')
        .map((item) => item.trim())
        .filter((item) => item.length > 0);
}

export function pickRandomItems(items: string[], maxCount: number): string[] {
    const shuffled = [...items];

    for (let i = shuffled.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = shuffled[i];
        shuffled[i] = shuffled[j];
        shuffled[j] = temp;
    }

    return shuffled.slice(0, Math.max(0, maxCount));
}

export function toMembershipMap(items: string[]): Record<string, true> {
    const map: Record<string, true> = {};

    for (let i = 0; i < items.length; i += 1) {
        const value = String(items[i] || '').trim();
        if (value) {
            map[value] = true;
        }
    }

    return map;
}

export function mapKeys(map: Record<string, true>): string[] {
    return Object.keys(map);
}

export function normalizeSelectedAnswerIds(value: any): string[] {
    if (!Array.isArray(value)) {
        return [];
    }

    const map: Record<string, true> = {};
    for (let i = 0; i < value.length; i += 1) {
        const id = String(value[i] || '').trim();
        if (id) {
            map[id] = true;
        }
    }

    return Object.keys(map);
}

export function isStringArray(value: any): value is string[] {
    if (!Array.isArray(value)) {
        return false;
    }

    for (let i = 0; i < value.length; i += 1) {
        if (typeof value[i] !== 'string') {
            return false;
        }
    }

    return true;
}