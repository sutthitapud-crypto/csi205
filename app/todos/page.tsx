'use client';
import { Button } from "@/components/tailgrids/core/button";
import { Toggle } from "@/components/tailgrids/core/toggle";
import { useEffect, useState } from "react";
import {
  NativeSelect,
  NativeSelectOption
} from "@/components/tailgrids/core/native-select";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRoot,
  TableRow
} from "@/components/tailgrids/core/table";
import { Badge } from "@/components/tailgrids/core/badge";
import { Pagination } from "@/components/tailgrids/core/pagination";
import { Spinner } from "@/components/tailgrids/core/spinner";
import { Check, ClockThree, Plus, Trash1 } from '@tailgrids/icons';

import { fetchTodos } from "@/app/data/todos";
import type { TodoType } from "@/app/data/todos";

export default function Page() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [todos, setTodos] = useState<TodoType[]>([])
  const [loadError, setLoadError] = useState(false)
  const [showWaitingOnly, setShowWaitingOnly] = useState(false)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let isActive = true;

    fetchTodos()
      .then((data) => {
        if (!isActive) return;
        setTodos(data as TodoType[]);
        setLoadError(false);
      })
      .catch(() => {
        if (isActive) setLoadError(true);
      })
      .finally(() => {
        if (isActive) setIsLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, [])

  const filteredTodos = showWaitingOnly
    ? todos.filter((todo) => !todo.completed)
    : todos
  const totalPages = Math.max(1, Math.ceil(filteredTodos.length / itemsPerPage))
  const page = Math.min(currentPage, totalPages)
  const visibleTodos = filteredTodos.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  )

  function addTodo() {
    const title = window.prompt("Enter a todo title")?.trim()
    if (!title) return

    const nextId = todos.reduce((maxId, todo) => Math.max(maxId, todo.id), 0) + 1
    setTodos((currentTodos) => [
      ...currentTodos,
      { userId: 1, id: nextId, title, completed: false }
    ])
    setCurrentPage(Math.ceil((filteredTodos.length + 1) / itemsPerPage))
  }


  return (
    // todos contayioner
    <div className='mt-4 px-2 max-w-3xl mx-auto'>
      {/* controller */}
      <div className='flex justify-between'>
        {/* toggle */}
        <div className='flex items-center'>
          <Toggle
            label='Show only'
            checked={showWaitingOnly}
            onChange={(event) => {
              setShowWaitingOnly(event.currentTarget.checked)
              setCurrentPage(1)
            }}
          />
          &nbsp;
          <Button
            size='sm'
            className='h-8 p-2 bg-yellow-500 pointer-events-none'>
            Waiting
            <ClockThree />
          </Button>
        </div>



        {/* dropdown */}
        <div>
          <NativeSelect
            value={itemsPerPage}
            onChange={(event) => {
              setItemsPerPage(Number(event.currentTarget.value))
              setCurrentPage(1)
            }}
          >
            <NativeSelectOption value={5}>5 items per page</NativeSelectOption>
            <NativeSelectOption value={10}>10 items per page</NativeSelectOption>
            <NativeSelectOption value={50}>50 items per page</NativeSelectOption>
          </NativeSelect>
        </div>
      </div>
      {/* table */}
      <div className='mt-2'>
        <TableRoot>
          <TableHeader>
            <TableRow className='bg-black text-white'>
              <TableHead className='w-24 font-bold text-right'>ID</TableHead>
              <TableHead className='font-bold text-center'>Title</TableHead>
              <TableHead className='font-bold flex justify-end items-center gap-1'>Completed
                <Button
                  variant={'primary'}
                  className='h-8 p-2'
                  aria-label='Add todo'
                  onClick={addTodo}
                >
                  <Plus />
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>

            {/* show spinner while loading */}
               {isLoading && (
                <TableRow>
                <TableCell colSpan={3}>
                  <Spinner className="mx-auto" />
                </TableCell>
                </TableRow>
                )}

          

           {!isLoading && loadError && (
            <TableRow>
              <TableCell colSpan={3} className='text-center text-red-500'>
              No data, may be connection refused (refetch again)
              </TableCell>
            </TableRow>
           )}

           {!isLoading && !loadError && visibleTodos.length === 0 && (
            <TableRow>
              <TableCell colSpan={3} className='text-center'>
                No todos found.
              </TableCell>
            </TableRow>
           )}

           {!isLoading && !loadError && visibleTodos.map((todo) => (
            <TableRow key={todo.id}>
              <TableCell className='text-right'>
                <Badge
                  size='lg'
                  className='rounded-lg bg-gray-500 text-white font-bold'
                >
                  {todo.id}
                </Badge>
              </TableCell>
              <TableCell>{todo.title}</TableCell>
              <TableCell className='flex justify-end gap-1'>
                <Button
                  size='sm'
                  className={todo.completed
                    ? 'h-8 bg-green-700 text-white p-2'
                    : 'h-8 bg-yellow-500 hover:bg-yellow-700 hover:text-yellow-200 p-2'}
                  aria-label={`Mark ${todo.title} as ${todo.completed ? 'waiting' : 'done'}`}
                  onClick={() => setTodos((currentTodos) => currentTodos.map((item) =>
                    item.id === todo.id ? { ...item, completed: !item.completed } : item
                  ))}
                >
                  {todo.completed ? 'Done' : 'Waiting'}
                  {todo.completed ? <Check /> : <ClockThree />}
                </Button>
                <Button
                  variant='danger'
                  className='h-8 p-2'
                  aria-label={`Delete ${todo.title}`}
                  onClick={() => setTodos((currentTodos) =>
                    currentTodos.filter((item) => item.id !== todo.id)
                  )}
                >
                  <Trash1 />
                </Button>
              </TableCell>
            </TableRow>
           ))}


            {/* completed = faldse */}
            {/* <TableRow>
              <TableCell className='text-right'>
                <Badge
                  size={'lg'}
                  className='rounded-lg bg-gray-500 text-white font-bold'
                >
                  12
                </Badge>
              </TableCell>
              <TableCell>Lorem ipsum dolor.</TableCell>
              <TableCell className='flex justify-end gap-1'>
                <Button
                  size='sm'
                  className='h-8 bg-yellow-500 hover:bg-yellow-700 hover:text-yellow-200 p-2'
                >
                  Waiting
                  <ClockThree />
                </Button>
                <Button variant='danger' className='h-8 p-2'>
                  <Trash1 />
                </Button>
              </TableCell>
            </TableRow> */}
            {/* completed = true  */}
            {/* <TableRow>
              <TableCell className='text-right'>
                <Badge
                  size='lg'
                  className='rounded-lg bg-gray-500 text-white font-bold'
                >
                  1234
                </Badge>
              </TableCell>
              <TableCell>Lorem ipsum dolor.</TableCell>
              <TableCell className='flex justify-end gap-1'>
                <Button
                  size='sm'
                  className='h-8 bg-green-700 text-white pointer-events-none p-2'
                >
                  Done
                  <Check />
                </Button>
                <Button variant='danger' className='h-8 p-2'>
                  <Trash1 />
                </Button>
              </TableCell>
            </TableRow> */}

          </TableBody>
        </TableRoot>
      </div>
      {/* pagination */}
      {!isLoading && !loadError && todos.length > 0 && (<div className='mt-2 w-2/3 mx-auto flex justify-center items-center gap-1'>
        <Button
          size='sm'
          appearance='outline'
          disabled={page === 1}
          onClick={() => setCurrentPage(1)}
        >
          First
        </Button>
        <div>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            variant="compact"
            onPageChange={(page) => setCurrentPage(page)}
            sideLayout="icon"
          />
        </div>
        <Button
          size='sm'
          appearance='outline'
          disabled={page === totalPages}
          onClick={() => setCurrentPage(totalPages)}
        >
          Last
        </Button>
      </div>
      )}
    </div>
  );
}
