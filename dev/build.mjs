import {readFile, writeFile} from 'fs/promises';
import {filter, resource, solution} from './templates.mjs'

import cheerio from 'cheerio'

const PAGE_TEMPLATE = './dev/issue_page_template.html'
const PAGE_OUTPUT = './ukraine.html'
const FILTERS_ID = 'filters'
const SOLUTIONS_ID = 'solutions'
const RESOURCES_ID = 'resources'

const filters = JSON.parse(
    await readFile(
        new URL('../db/filters.json', import.meta.url)
    )
);
const solutions = JSON.parse(
    await readFile(
        new URL('../db/solutions.json', import.meta.url)
    )
)
const resources = JSON.parse(
    await readFile(
        new URL('../db/resources.json', import.meta.url)
    )
)

const buildSolutions =
    () => {
        let res =
            solutions.sort((a, b) => sortByTitle(a, b)).map(sol => {
                return solution(sol) || null
            })
        return res
    }

const buildResources =
    () => {
        let res =
            resources.sort((a, b) => sortByTitle(a, b)).map(rec => {
                return resource(rec)
            })
        return res
    }

const buildFilters =
    () => {
        let res = []
        for (const key in filters) {
            res.push(filter(key))
        }
        return res
    }

const sortByTitle = (a, b) => {
    let fa = a.title.toLowerCase(),
        fb = b.title.toLowerCase();

    if (fa < fb) {
        return -1;
    }
    if (fa > fb) {
        return 1;
    }
    return 0;
}

const write = async (filters, resources, solutions) => {
    let xmlString = await readFile(PAGE_TEMPLATE, 'utf8')
    const $ = cheerio.load(xmlString)
    $(`#${FILTERS_ID}`).html(filters.join(''))
    $(`#${SOLUTIONS_ID}`).html(solutions.join(''))
    $(`#${RESOURCES_ID}`).html(resources.join(''))
    writeFile(PAGE_OUTPUT, $.html())
}
const build = async () => {
    let solutions = buildSolutions()
    let resources = buildResources()
    let filters = buildFilters()

    write(filters, resources, solutions)
}

build()

