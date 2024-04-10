let SessionLoad = 1
let s:so_save = &g:so | let s:siso_save = &g:siso | setg so=0 siso=0 | setl so=-1 siso=-1
let v:this_session=expand("<sfile>:p")
silent only
silent tabonly
cd /mnt/Data/code/fullstack/kampuni-area/taskFilter
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
let s:shortmess_save = &shortmess
if &shortmess =~ 'A'
  set shortmess=aoOA
else
  set shortmess=aoO
endif
badd +24 packages/shared-ui/src/components/FormGroup/index.tsx
badd +129 packages/ui-app/app/_features/TaskFilter/index.tsx
badd +1 packages/ui-app/app/_features/ProjectViewFilter/FilterForm.tsx
badd +5 /mnt/Data/code/fullstack/kampuni-area/taskFilter/packages/ui-app/app/_features/ProjectViewFilter/ListFilter.tsx
badd +60 /mnt/Data/code/fullstack/kampuni-area/taskFilter/packages/ui-app/app/_features/ProjectView/ProjectViewModalForm.tsx
badd +29 /mnt/Data/code/fullstack/kampuni-area/taskFilter/packages/ui-app/app/\[orgID]/layout.tsx
badd +1 packages/ui-app/app/\[orgID]/page.tsx
badd +4 packages/ui-app/app/\[orgID]/project/page.tsx
badd +2 packages/ui-app/app/\[orgID]/project/\[projectId]/page.tsx
badd +2 packages/ui-app/app/\[orgID]/project/\[projectId]/ProjectContentLoading.tsx
badd +87 /mnt/Data/code/fullstack/kampuni-area/taskFilter/packages/ui-app/app/_features/ProjectContainer/index.tsx
badd +40 packages/ui-app/app/\[orgID]/project/\[projectId]/MultiSelect.tsx
badd +286 /mnt/Data/code/fullstack/kampuni-area/taskFilter/packages/ui-app/app/_features/TaskFilter/context.tsx
badd +98 packages/ui-app/app/\[orgID]/project/\[projectId]/views/ListMode.tsx
badd +11 packages/ui-app/app/\[orgID]/project/\[projectId]/views/ListRow.tsx
badd +190 /mnt/Data/code/fullstack/kampuni-area/taskFilter/packages/ui-app/app/\[orgID]/project/\[projectId]/ProjectNav.tsx
badd +8 packages/ui-app/app/\[orgID]/project/\[projectId]/TaskList.tsx
badd +93 /mnt/Data/code/fullstack/kampuni-area/taskFilter/packages/ui-app/app/\[orgID]/project/\[projectId]/ProjectTabContent.tsx
badd +13 /mnt/Data/code/fullstack/kampuni-area/taskFilter/packages/ui-app/app/_features/ProjectView/useProjectViewList.ts
badd +96 /mnt/Data/code/fullstack/kampuni-area/taskFilter/packages/ui-app/app/_features/TaskFilter/useTaskFilterContext.ts
badd +79 packages/shared-libs/src/lib/date-string-converter.ts
argglobal
%argdel
tabnew +setlocal\ bufhidden=wipe
tabnew +setlocal\ bufhidden=wipe
tabnew +setlocal\ bufhidden=wipe
tabnew +setlocal\ bufhidden=wipe
tabrewind
edit /mnt/Data/code/fullstack/kampuni-area/taskFilter/packages/ui-app/app/_features/TaskFilter/context.tsx
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
wincmd _ | wincmd |
split
1wincmd k
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd _ | wincmd |
split
1wincmd k
wincmd w
wincmd w
wincmd w
let &splitbelow = s:save_splitbelow
let &splitright = s:save_splitright
wincmd t
let s:save_winminheight = &winminheight
let s:save_winminwidth = &winminwidth
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe '1resize ' . ((&lines * 25 + 32) / 65)
exe 'vert 1resize ' . ((&columns * 120 + 120) / 240)
exe '2resize ' . ((&lines * 25 + 32) / 65)
exe 'vert 2resize ' . ((&columns * 120 + 120) / 240)
exe '3resize ' . ((&lines * 51 + 32) / 65)
exe 'vert 3resize ' . ((&columns * 119 + 120) / 240)
exe '4resize ' . ((&lines * 10 + 32) / 65)
argglobal
balt /mnt/Data/code/fullstack/kampuni-area/taskFilter/packages/ui-app/app/_features/TaskFilter/useTaskFilterContext.ts
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 317 - ((11 * winheight(0) + 12) / 24)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 317
normal! 09|
wincmd w
argglobal
if bufexists(fnamemodify("/mnt/Data/code/fullstack/kampuni-area/taskFilter/packages/ui-app/app/_features/TaskFilter/useTaskFilterContext.ts", ":p")) | buffer /mnt/Data/code/fullstack/kampuni-area/taskFilter/packages/ui-app/app/_features/TaskFilter/useTaskFilterContext.ts | else | edit /mnt/Data/code/fullstack/kampuni-area/taskFilter/packages/ui-app/app/_features/TaskFilter/useTaskFilterContext.ts | endif
if &buftype ==# 'terminal'
  silent file /mnt/Data/code/fullstack/kampuni-area/taskFilter/packages/ui-app/app/_features/TaskFilter/useTaskFilterContext.ts
endif
balt /mnt/Data/code/fullstack/kampuni-area/taskFilter/packages/ui-app/app/_features/TaskFilter/context.tsx
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 39 - ((13 * winheight(0) + 12) / 24)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 39
normal! 09|
wincmd w
argglobal
if bufexists(fnamemodify("packages/ui-app/app/_features/TaskFilter/index.tsx", ":p")) | buffer packages/ui-app/app/_features/TaskFilter/index.tsx | else | edit packages/ui-app/app/_features/TaskFilter/index.tsx | endif
if &buftype ==# 'terminal'
  silent file packages/ui-app/app/_features/TaskFilter/index.tsx
endif
balt /mnt/Data/code/fullstack/kampuni-area/taskFilter/packages/ui-app/app/_features/TaskFilter/useTaskFilterContext.ts
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 128 - ((39 * winheight(0) + 25) / 50)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 128
normal! 026|
wincmd w
argglobal
enew
balt packages/ui-app/app/_features/TaskFilter/index.tsx
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal nofen
wincmd w
3wincmd w
exe '1resize ' . ((&lines * 25 + 32) / 65)
exe 'vert 1resize ' . ((&columns * 120 + 120) / 240)
exe '2resize ' . ((&lines * 25 + 32) / 65)
exe 'vert 2resize ' . ((&columns * 120 + 120) / 240)
exe '3resize ' . ((&lines * 51 + 32) / 65)
exe 'vert 3resize ' . ((&columns * 119 + 120) / 240)
exe '4resize ' . ((&lines * 10 + 32) / 65)
tabnext
edit packages/shared-libs/src/lib/date-string-converter.ts
argglobal
balt packages/ui-app/app/_features/TaskFilter/index.tsx
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 79 - ((50 * winheight(0) + 30) / 61)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 79
normal! 014|
tabnext
edit /mnt/Data/code/fullstack/kampuni-area/taskFilter/packages/ui-app/app/_features/ProjectViewFilter/ListFilter.tsx
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd _ | wincmd |
split
1wincmd k
wincmd w
wincmd w
let &splitbelow = s:save_splitbelow
let &splitright = s:save_splitright
wincmd t
let s:save_winminheight = &winminheight
let s:save_winminwidth = &winminwidth
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe '1resize ' . ((&lines * 31 + 32) / 65)
exe 'vert 1resize ' . ((&columns * 120 + 120) / 240)
exe '2resize ' . ((&lines * 30 + 32) / 65)
exe 'vert 2resize ' . ((&columns * 120 + 120) / 240)
exe 'vert 3resize ' . ((&columns * 119 + 120) / 240)
argglobal
balt packages/ui-app/app/_features/ProjectViewFilter/FilterForm.tsx
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 5 - ((4 * winheight(0) + 15) / 30)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 5
normal! 08|
wincmd w
argglobal
if bufexists(fnamemodify("/mnt/Data/code/fullstack/kampuni-area/taskFilter/packages/ui-app/app/_features/ProjectView/ProjectViewModalForm.tsx", ":p")) | buffer /mnt/Data/code/fullstack/kampuni-area/taskFilter/packages/ui-app/app/_features/ProjectView/ProjectViewModalForm.tsx | else | edit /mnt/Data/code/fullstack/kampuni-area/taskFilter/packages/ui-app/app/_features/ProjectView/ProjectViewModalForm.tsx | endif
if &buftype ==# 'terminal'
  silent file /mnt/Data/code/fullstack/kampuni-area/taskFilter/packages/ui-app/app/_features/ProjectView/ProjectViewModalForm.tsx
endif
balt /mnt/Data/code/fullstack/kampuni-area/taskFilter/packages/ui-app/app/_features/ProjectViewFilter/ListFilter.tsx
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 60 - ((16 * winheight(0) + 14) / 29)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 60
normal! 08|
wincmd w
argglobal
if bufexists(fnamemodify("packages/ui-app/app/_features/ProjectViewFilter/FilterForm.tsx", ":p")) | buffer packages/ui-app/app/_features/ProjectViewFilter/FilterForm.tsx | else | edit packages/ui-app/app/_features/ProjectViewFilter/FilterForm.tsx | endif
if &buftype ==# 'terminal'
  silent file packages/ui-app/app/_features/ProjectViewFilter/FilterForm.tsx
endif
balt /mnt/Data/code/fullstack/kampuni-area/taskFilter/packages/ui-app/app/_features/ProjectViewFilter/ListFilter.tsx
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 10 - ((9 * winheight(0) + 30) / 61)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 10
normal! 029|
wincmd w
exe '1resize ' . ((&lines * 31 + 32) / 65)
exe 'vert 1resize ' . ((&columns * 120 + 120) / 240)
exe '2resize ' . ((&lines * 30 + 32) / 65)
exe 'vert 2resize ' . ((&columns * 120 + 120) / 240)
exe 'vert 3resize ' . ((&columns * 119 + 120) / 240)
tabnext
edit packages/ui-app/app/\[orgID]/project/\[projectId]/page.tsx
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd _ | wincmd |
split
1wincmd k
wincmd w
wincmd w
wincmd _ | wincmd |
split
1wincmd k
wincmd w
let &splitbelow = s:save_splitbelow
let &splitright = s:save_splitright
wincmd t
let s:save_winminheight = &winminheight
let s:save_winminwidth = &winminwidth
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe '1resize ' . ((&lines * 31 + 32) / 65)
exe 'vert 1resize ' . ((&columns * 120 + 120) / 240)
exe '2resize ' . ((&lines * 30 + 32) / 65)
exe 'vert 2resize ' . ((&columns * 120 + 120) / 240)
exe '3resize ' . ((&lines * 31 + 32) / 65)
exe 'vert 3resize ' . ((&columns * 119 + 120) / 240)
exe '4resize ' . ((&lines * 30 + 32) / 65)
exe 'vert 4resize ' . ((&columns * 119 + 120) / 240)
argglobal
balt /mnt/Data/code/fullstack/kampuni-area/taskFilter/packages/ui-app/app/_features/ProjectContainer/index.tsx
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 5 - ((4 * winheight(0) + 15) / 30)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 5
normal! 010|
wincmd w
argglobal
if bufexists(fnamemodify("/mnt/Data/code/fullstack/kampuni-area/taskFilter/packages/ui-app/app/_features/TaskFilter/context.tsx", ":p")) | buffer /mnt/Data/code/fullstack/kampuni-area/taskFilter/packages/ui-app/app/_features/TaskFilter/context.tsx | else | edit /mnt/Data/code/fullstack/kampuni-area/taskFilter/packages/ui-app/app/_features/TaskFilter/context.tsx | endif
if &buftype ==# 'terminal'
  silent file /mnt/Data/code/fullstack/kampuni-area/taskFilter/packages/ui-app/app/_features/TaskFilter/context.tsx
endif
balt packages/ui-app/app/\[orgID]/project/\[projectId]/page.tsx
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 104 - ((14 * winheight(0) + 14) / 29)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 104
normal! 014|
wincmd w
argglobal
if bufexists(fnamemodify("/mnt/Data/code/fullstack/kampuni-area/taskFilter/packages/ui-app/app/\[orgID]/project/\[projectId]/ProjectNav.tsx", ":p")) | buffer /mnt/Data/code/fullstack/kampuni-area/taskFilter/packages/ui-app/app/\[orgID]/project/\[projectId]/ProjectNav.tsx | else | edit /mnt/Data/code/fullstack/kampuni-area/taskFilter/packages/ui-app/app/\[orgID]/project/\[projectId]/ProjectNav.tsx | endif
if &buftype ==# 'terminal'
  silent file /mnt/Data/code/fullstack/kampuni-area/taskFilter/packages/ui-app/app/\[orgID]/project/\[projectId]/ProjectNav.tsx
endif
balt /mnt/Data/code/fullstack/kampuni-area/taskFilter/packages/ui-app/app/_features/ProjectContainer/index.tsx
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 101 - ((15 * winheight(0) + 15) / 30)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 101
normal! 09|
wincmd w
argglobal
if bufexists(fnamemodify("/mnt/Data/code/fullstack/kampuni-area/taskFilter/packages/ui-app/app/_features/ProjectContainer/index.tsx", ":p")) | buffer /mnt/Data/code/fullstack/kampuni-area/taskFilter/packages/ui-app/app/_features/ProjectContainer/index.tsx | else | edit /mnt/Data/code/fullstack/kampuni-area/taskFilter/packages/ui-app/app/_features/ProjectContainer/index.tsx | endif
if &buftype ==# 'terminal'
  silent file /mnt/Data/code/fullstack/kampuni-area/taskFilter/packages/ui-app/app/_features/ProjectContainer/index.tsx
endif
balt /mnt/Data/code/fullstack/kampuni-area/taskFilter/packages/ui-app/app/\[orgID]/project/\[projectId]/ProjectNav.tsx
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 87 - ((27 * winheight(0) + 14) / 29)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 87
normal! 06|
wincmd w
exe '1resize ' . ((&lines * 31 + 32) / 65)
exe 'vert 1resize ' . ((&columns * 120 + 120) / 240)
exe '2resize ' . ((&lines * 30 + 32) / 65)
exe 'vert 2resize ' . ((&columns * 120 + 120) / 240)
exe '3resize ' . ((&lines * 31 + 32) / 65)
exe 'vert 3resize ' . ((&columns * 119 + 120) / 240)
exe '4resize ' . ((&lines * 30 + 32) / 65)
exe 'vert 4resize ' . ((&columns * 119 + 120) / 240)
tabnext
edit /mnt/Data/code/fullstack/kampuni-area/taskFilter/packages/ui-app/app/\[orgID]/project/\[projectId]/ProjectNav.tsx
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd _ | wincmd |
split
1wincmd k
wincmd w
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd w
wincmd w
let &splitbelow = s:save_splitbelow
let &splitright = s:save_splitright
wincmd t
let s:save_winminheight = &winminheight
let s:save_winminwidth = &winminwidth
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe '1resize ' . ((&lines * 31 + 32) / 65)
exe 'vert 1resize ' . ((&columns * 160 + 120) / 240)
exe '2resize ' . ((&lines * 30 + 32) / 65)
exe 'vert 2resize ' . ((&columns * 80 + 120) / 240)
exe '3resize ' . ((&lines * 30 + 32) / 65)
exe 'vert 3resize ' . ((&columns * 79 + 120) / 240)
exe 'vert 4resize ' . ((&columns * 79 + 120) / 240)
argglobal
balt /mnt/Data/code/fullstack/kampuni-area/taskFilter/packages/ui-app/app/\[orgID]/project/\[projectId]/ProjectTabContent.tsx
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 191 - ((18 * winheight(0) + 15) / 30)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 191
normal! 010|
wincmd w
argglobal
if bufexists(fnamemodify("/mnt/Data/code/fullstack/kampuni-area/taskFilter/packages/ui-app/app/_features/ProjectView/useProjectViewList.ts", ":p")) | buffer /mnt/Data/code/fullstack/kampuni-area/taskFilter/packages/ui-app/app/_features/ProjectView/useProjectViewList.ts | else | edit /mnt/Data/code/fullstack/kampuni-area/taskFilter/packages/ui-app/app/_features/ProjectView/useProjectViewList.ts | endif
if &buftype ==# 'terminal'
  silent file /mnt/Data/code/fullstack/kampuni-area/taskFilter/packages/ui-app/app/_features/ProjectView/useProjectViewList.ts
endif
balt /mnt/Data/code/fullstack/kampuni-area/taskFilter/packages/ui-app/app/\[orgID]/project/\[projectId]/ProjectTabContent.tsx
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 63 - ((18 * winheight(0) + 14) / 29)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 63
normal! 016|
wincmd w
argglobal
if bufexists(fnamemodify("/mnt/Data/code/fullstack/kampuni-area/taskFilter/packages/ui-app/app/\[orgID]/project/\[projectId]/ProjectTabContent.tsx", ":p")) | buffer /mnt/Data/code/fullstack/kampuni-area/taskFilter/packages/ui-app/app/\[orgID]/project/\[projectId]/ProjectTabContent.tsx | else | edit /mnt/Data/code/fullstack/kampuni-area/taskFilter/packages/ui-app/app/\[orgID]/project/\[projectId]/ProjectTabContent.tsx | endif
if &buftype ==# 'terminal'
  silent file /mnt/Data/code/fullstack/kampuni-area/taskFilter/packages/ui-app/app/\[orgID]/project/\[projectId]/ProjectTabContent.tsx
endif
balt /mnt/Data/code/fullstack/kampuni-area/taskFilter/packages/ui-app/app/_features/ProjectView/useProjectViewList.ts
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 114 - ((10 * winheight(0) + 14) / 29)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 114
normal! 016|
wincmd w
argglobal
if bufexists(fnamemodify("packages/ui-app/app/\[orgID]/project/\[projectId]/views/ListMode.tsx", ":p")) | buffer packages/ui-app/app/\[orgID]/project/\[projectId]/views/ListMode.tsx | else | edit packages/ui-app/app/\[orgID]/project/\[projectId]/views/ListMode.tsx | endif
if &buftype ==# 'terminal'
  silent file packages/ui-app/app/\[orgID]/project/\[projectId]/views/ListMode.tsx
endif
balt packages/ui-app/app/\[orgID]/project/\[projectId]/TaskList.tsx
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 27 - ((26 * winheight(0) + 30) / 61)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 27
normal! 08|
wincmd w
exe '1resize ' . ((&lines * 31 + 32) / 65)
exe 'vert 1resize ' . ((&columns * 160 + 120) / 240)
exe '2resize ' . ((&lines * 30 + 32) / 65)
exe 'vert 2resize ' . ((&columns * 80 + 120) / 240)
exe '3resize ' . ((&lines * 30 + 32) / 65)
exe 'vert 3resize ' . ((&columns * 79 + 120) / 240)
exe 'vert 4resize ' . ((&columns * 79 + 120) / 240)
tabnext 1
if exists('s:wipebuf') && len(win_findbuf(s:wipebuf)) == 0 && getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20
let &shortmess = s:shortmess_save
let &winminheight = s:save_winminheight
let &winminwidth = s:save_winminwidth
let s:sx = expand("<sfile>:p:r")."x.vim"
if filereadable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &g:so = s:so_save | let &g:siso = s:siso_save
set hlsearch
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
