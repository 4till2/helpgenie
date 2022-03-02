import {readFile} from 'fs/promises';

const filters = JSON.parse(
    await readFile(
        new URL('../db/filters.json', import.meta.url)
    )
);
export const solution =
    (o) => {
        return `
            <li data-filter-by='${filters[o.filter]?.key}' class="solution">
                <a href="${o.href}" target="_blank" class="block hover:bg-gray-50">
                    <div class="px-4 py-4 sm:px-6">
                        <div class="grid items-center justify-between">
                            <div>
                                <p class="text-lg font-semibold text-indigo-600">${o.title}</p>
                                <p class=" text-gray-600 text-xs">${o.description}</p>
                            </div>
                            <div class=" overflow-scroll mt-2">
                                <div data-filter='${filters[o.filter].key}' class="mr-2 flex-shrink-0 flex">
                                    <p class="active px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${filters[o.filter].color}-100 text-green-800">
                                        ${filters[o.filter].title}</p>
                                </div>
                            </div>
                        </div>
                        <div class="mt-2 sm:flex sm:justify-between text-xs">
                            <div class="sm:flex">
                                <p class="flex items-center text-gray-500 overflow-scroll">
                                    <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none"
                                         stroke="currentColor" viewBox="0 0 24 24"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                                    </svg>
                                    ${o.href}
                                </p>
                            </div>
                            <div class="mt-2 flex items-center text-xs text-gray-500 sm:mt-0">
                                <p>
                                    Last updated:
                                    <time datetime="${new Date().toLocaleDateString()}">
                                        ${new Date().toLocaleDateString('en-us', {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric"
        })
        }
                                    </time>
                                </p>
                            </div>
                        </div>
                    </div>
                </a>
            </li>
`
    }

const tag = (title) => {
    return `<div class='p-1 px-2 mr-2 rounded-lg bg-gray-300 text-gray-900 font-light'>${title}</div>`

}
export const resource =
    (o) => {
        return `
    <div class="my-2">
        <p class="text-xl mt-2 text-gray-900">
            <a href="${o.href}" class="text-blue-800 underline">${o.title}</a>
        </p>
        <p>${o.description}</p>
        <div class="overflow-scroll text-xs flex my-2">${o.tags.map(t => tag(t))}
        </div>
    </div>
`
    }

export const filter =
    (key) => {
        return `
    <div class="ml-2 flex-shrink-0 ">
        <p data-filter='${key}'
           class="cursor-pointer px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${filters[key].color}-100 text-${filters[key].color}-800">
            ${filters[key].title}</p>
    </div>`
    }
