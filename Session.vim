let SessionLoad = 1
let s:so_save = &g:so | let s:siso_save = &g:siso | setg so=0 siso=0 | setl so=-1 siso=-1
let v:this_session=expand("<sfile>:p")
silent only
silent tabonly
cd /mnt/Data/code/fullstack/kampuni-area/activity
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
let s:shortmess_save = &shortmess
if &shortmess =~ 'A'
  set shortmess=aoOA
else
  set shortmess=aoO
endif
badd +48 packages/shared-models/src/prisma/schema.prisma
badd +6 packages/shared-models/src/type.ts
badd +4 packages/ui-app/app/_features/Activity/index.tsx
badd +24 /mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/_features/Activity/ActivityCreatorAvatar.tsx
badd +1 packages/ui-app/app/_features/Activity/ActivityCardHeader.tsx
badd +10 /mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/_features/Activity/ActivityMember.tsx
badd +1 /mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/_components/FileKits/index.tsx
badd +131 /mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/\[orgID]/project/\[projectId]/TaskUpdate.tsx
badd +157 /mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/\[orgID]/project/\[projectId]/ProjectNav.tsx
badd +10 /mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/_features/Activity/ActivityList.tsx
badd +35 packages/shared-models/src/lib/activity.ts
badd +4 /mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/_components/FileKits/FileGet.tsx
badd +1 /mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/_components/FileKits/useFileGet.ts
badd +1 /mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/services/storage.ts
badd +4 packages/ui-app/services/activity.ts
badd +1 packages/shared-models/src/lib/_prisma.ts
badd +1 packages/be-gateway/src/routes/storage/index.ts
badd +16 packages/be-gateway/src/routes/index.ts
badd +1 packages/be-gateway/src/routes/activity/index.ts
badd +29 packages/ui-app/services/task.ts
badd +1 packages/be-gateway/src/routes/task/index.ts
badd +16 packages/shared-models/src/lib/index.ts
badd +75 /mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/_features/TaskImport/TaskImportAction.tsx
badd +53 packages/ui-app/services/_req.ts
badd +63 health://
badd +14 /mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/_features/Project/Overview/OverviewTasks.tsx
badd +1 /mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/_features/Activity/ActivityCardCommentContent.tsx
badd +1 /mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/_features/Activity/ActivityCardAttachContent.tsx
badd +2 packages/shared-models/src/index.ts
badd +2 /mnt/Data/code/fullstack/kampuni-area/activity/packages/shared-models/src/lib/projectPin.ts
badd +5 packages/shared-models/src/lib/favorite.ts
badd +155 packages/shared-models/src/lib/task.ts
badd +1 ~/.local/share/nvim/lspsaga.log
argglobal
%argdel
tabnew +setlocal\ bufhidden=wipe
tabnew +setlocal\ bufhidden=wipe
tabrewind
edit packages/be-gateway/src/routes/activity/index.ts
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd _ | wincmd |
split
1wincmd k
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd w
wincmd w
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd _ | wincmd |
split
1wincmd k
wincmd w
wincmd w
wincmd w
wincmd _ | wincmd |
split
wincmd _ | wincmd |
split
2wincmd k
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
exe '1resize ' . ((&lines * 16 + 33) / 67)
exe 'vert 1resize ' . ((&columns * 79 + 120) / 240)
exe '2resize ' . ((&lines * 16 + 33) / 67)
exe 'vert 2resize ' . ((&columns * 79 + 120) / 240)
exe '3resize ' . ((&lines * 23 + 33) / 67)
exe 'vert 3resize ' . ((&columns * 79 + 120) / 240)
exe '4resize ' . ((&lines * 23 + 33) / 67)
exe 'vert 4resize ' . ((&columns * 79 + 120) / 240)
exe '5resize ' . ((&lines * 47 + 33) / 67)
exe 'vert 5resize ' . ((&columns * 79 + 120) / 240)
exe '6resize ' . ((&lines * 21 + 33) / 67)
exe 'vert 6resize ' . ((&columns * 80 + 120) / 240)
exe '7resize ' . ((&lines * 21 + 33) / 67)
exe 'vert 7resize ' . ((&columns * 80 + 120) / 240)
exe '8resize ' . ((&lines * 20 + 33) / 67)
exe 'vert 8resize ' . ((&columns * 80 + 120) / 240)
argglobal
balt packages/be-gateway/src/routes/storage/index.ts
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
let s:l = 29 - ((7 * winheight(0) + 7) / 15)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 29
normal! 027|
wincmd w
argglobal
if bufexists(fnamemodify("packages/be-gateway/src/routes/task/index.ts", ":p")) | buffer packages/be-gateway/src/routes/task/index.ts | else | edit packages/be-gateway/src/routes/task/index.ts | endif
if &buftype ==# 'terminal'
  silent file packages/be-gateway/src/routes/task/index.ts
endif
balt packages/be-gateway/src/routes/activity/index.ts
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
let s:l = 44 - ((6 * winheight(0) + 7) / 15)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 44
normal! 035|
wincmd w
argglobal
if bufexists(fnamemodify("packages/ui-app/services/activity.ts", ":p")) | buffer packages/ui-app/services/activity.ts | else | edit packages/ui-app/services/activity.ts | endif
if &buftype ==# 'terminal'
  silent file packages/ui-app/services/activity.ts
endif
balt packages/be-gateway/src/routes/activity/index.ts
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
let s:l = 4 - ((3 * winheight(0) + 11) / 22)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 4
normal! 014|
wincmd w
argglobal
if bufexists(fnamemodify("/mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/_features/TaskImport/TaskImportAction.tsx", ":p")) | buffer /mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/_features/TaskImport/TaskImportAction.tsx | else | edit /mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/_features/TaskImport/TaskImportAction.tsx | endif
if &buftype ==# 'terminal'
  silent file /mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/_features/TaskImport/TaskImportAction.tsx
endif
balt packages/ui-app/services/task.ts
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
let s:l = 175 - ((11 * winheight(0) + 11) / 22)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 175
normal! 013|
wincmd w
argglobal
if bufexists(fnamemodify("packages/ui-app/services/task.ts", ":p")) | buffer packages/ui-app/services/task.ts | else | edit packages/ui-app/services/task.ts | endif
if &buftype ==# 'terminal'
  silent file packages/ui-app/services/task.ts
endif
balt packages/ui-app/services/activity.ts
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
let s:l = 29 - ((28 * winheight(0) + 23) / 46)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 29
normal! 072|
wincmd w
argglobal
if bufexists(fnamemodify("packages/shared-models/src/lib/task.ts", ":p")) | buffer packages/shared-models/src/lib/task.ts | else | edit packages/shared-models/src/lib/task.ts | endif
if &buftype ==# 'terminal'
  silent file packages/shared-models/src/lib/task.ts
endif
balt ~/.local/share/nvim/lspsaga.log
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
let s:l = 155 - ((9 * winheight(0) + 10) / 20)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 155
normal! 014|
wincmd w
argglobal
if bufexists(fnamemodify("packages/shared-models/src/lib/activity.ts", ":p")) | buffer packages/shared-models/src/lib/activity.ts | else | edit packages/shared-models/src/lib/activity.ts | endif
if &buftype ==# 'terminal'
  silent file packages/shared-models/src/lib/activity.ts
endif
balt packages/shared-models/src/lib/_prisma.ts
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
let s:l = 35 - ((9 * winheight(0) + 10) / 20)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 35
normal! 014|
wincmd w
argglobal
if bufexists(fnamemodify("packages/shared-models/src/prisma/schema.prisma", ":p")) | buffer packages/shared-models/src/prisma/schema.prisma | else | edit packages/shared-models/src/prisma/schema.prisma | endif
if &buftype ==# 'terminal'
  silent file packages/shared-models/src/prisma/schema.prisma
endif
balt packages/be-gateway/src/routes/activity/index.ts
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
let s:l = 48 - ((9 * winheight(0) + 9) / 19)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 48
normal! 09|
wincmd w
exe '1resize ' . ((&lines * 16 + 33) / 67)
exe 'vert 1resize ' . ((&columns * 79 + 120) / 240)
exe '2resize ' . ((&lines * 16 + 33) / 67)
exe 'vert 2resize ' . ((&columns * 79 + 120) / 240)
exe '3resize ' . ((&lines * 23 + 33) / 67)
exe 'vert 3resize ' . ((&columns * 79 + 120) / 240)
exe '4resize ' . ((&lines * 23 + 33) / 67)
exe 'vert 4resize ' . ((&columns * 79 + 120) / 240)
exe '5resize ' . ((&lines * 47 + 33) / 67)
exe 'vert 5resize ' . ((&columns * 79 + 120) / 240)
exe '6resize ' . ((&lines * 21 + 33) / 67)
exe 'vert 6resize ' . ((&columns * 80 + 120) / 240)
exe '7resize ' . ((&lines * 21 + 33) / 67)
exe 'vert 7resize ' . ((&columns * 80 + 120) / 240)
exe '8resize ' . ((&lines * 20 + 33) / 67)
exe 'vert 8resize ' . ((&columns * 80 + 120) / 240)
tabnext
edit packages/ui-app/app/_features/Activity/ActivityCardHeader.tsx
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
wincmd _ | wincmd |
vsplit
wincmd _ | wincmd |
vsplit
2wincmd h
wincmd w
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
exe 'vert 1resize ' . ((&columns * 49 + 120) / 240)
exe '2resize ' . ((&lines * 32 + 33) / 67)
exe 'vert 2resize ' . ((&columns * 94 + 120) / 240)
exe '3resize ' . ((&lines * 31 + 33) / 67)
exe 'vert 3resize ' . ((&columns * 94 + 120) / 240)
exe 'vert 4resize ' . ((&columns * 95 + 120) / 240)
argglobal
enew
file NvimTree_2
balt /mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/_features/Activity/ActivityList.tsx
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal nofen
wincmd w
argglobal
balt /mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/_features/Activity/ActivityMember.tsx
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
let s:l = 22 - ((21 * winheight(0) + 15) / 31)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 22
normal! 0
wincmd w
argglobal
if bufexists(fnamemodify("/mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/_features/Activity/ActivityList.tsx", ":p")) | buffer /mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/_features/Activity/ActivityList.tsx | else | edit /mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/_features/Activity/ActivityList.tsx | endif
if &buftype ==# 'terminal'
  silent file /mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/_features/Activity/ActivityList.tsx
endif
balt packages/ui-app/app/_features/Activity/index.tsx
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
let s:l = 10 - ((9 * winheight(0) + 15) / 30)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 10
normal! 047|
wincmd w
argglobal
if bufexists(fnamemodify("/mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/_features/Activity/ActivityCardCommentContent.tsx", ":p")) | buffer /mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/_features/Activity/ActivityCardCommentContent.tsx | else | edit /mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/_features/Activity/ActivityCardCommentContent.tsx | endif
if &buftype ==# 'terminal'
  silent file /mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/_features/Activity/ActivityCardCommentContent.tsx
endif
balt /mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/_features/Activity/ActivityCardAttachContent.tsx
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
let s:l = 1 - ((0 * winheight(0) + 31) / 63)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 1
normal! 010|
wincmd w
4wincmd w
exe 'vert 1resize ' . ((&columns * 49 + 120) / 240)
exe '2resize ' . ((&lines * 32 + 33) / 67)
exe 'vert 2resize ' . ((&columns * 94 + 120) / 240)
exe '3resize ' . ((&lines * 31 + 33) / 67)
exe 'vert 3resize ' . ((&columns * 94 + 120) / 240)
exe 'vert 4resize ' . ((&columns * 95 + 120) / 240)
tabnext
edit /mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/services/storage.ts
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd _ | wincmd |
split
1wincmd k
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd _ | wincmd |
split
1wincmd k
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd w
wincmd w
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
exe '1resize ' . ((&lines * 16 + 33) / 67)
exe 'vert 1resize ' . ((&columns * 60 + 120) / 240)
exe '2resize ' . ((&lines * 16 + 33) / 67)
exe 'vert 2resize ' . ((&columns * 59 + 120) / 240)
exe '3resize ' . ((&lines * 16 + 33) / 67)
exe 'vert 3resize ' . ((&columns * 120 + 120) / 240)
exe '4resize ' . ((&lines * 33 + 33) / 67)
exe 'vert 4resize ' . ((&columns * 59 + 120) / 240)
exe '5resize ' . ((&lines * 30 + 33) / 67)
exe 'vert 5resize ' . ((&columns * 180 + 120) / 240)
exe 'vert 6resize ' . ((&columns * 59 + 120) / 240)
argglobal
balt /mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/_components/FileKits/useFileGet.ts
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
let s:l = 31 - ((0 * winheight(0) + 8) / 16)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 31
normal! 0
wincmd w
argglobal
if bufexists(fnamemodify("/mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/_components/FileKits/useFileGet.ts", ":p")) | buffer /mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/_components/FileKits/useFileGet.ts | else | edit /mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/_components/FileKits/useFileGet.ts | endif
if &buftype ==# 'terminal'
  silent file /mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/_components/FileKits/useFileGet.ts
endif
balt /mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/services/storage.ts
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
let s:l = 33 - ((7 * winheight(0) + 8) / 16)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 33
normal! 07|
wincmd w
argglobal
if bufexists(fnamemodify("/mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/_components/FileKits/FileGet.tsx", ":p")) | buffer /mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/_components/FileKits/FileGet.tsx | else | edit /mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/_components/FileKits/FileGet.tsx | endif
if &buftype ==# 'terminal'
  silent file /mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/_components/FileKits/FileGet.tsx
endif
balt /mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/_components/FileKits/useFileGet.ts
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
let s:l = 4 - ((3 * winheight(0) + 8) / 16)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 4
normal! 06|
wincmd w
argglobal
if bufexists(fnamemodify("/mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/_components/FileKits/index.tsx", ":p")) | buffer /mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/_components/FileKits/index.tsx | else | edit /mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/_components/FileKits/index.tsx | endif
if &buftype ==# 'terminal'
  silent file /mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/_components/FileKits/index.tsx
endif
balt /mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/_components/FileKits/FileGet.tsx
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
let s:l = 33 - ((25 * winheight(0) + 16) / 33)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 33
normal! 012|
wincmd w
argglobal
if bufexists(fnamemodify("/mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/\[orgID]/project/\[projectId]/TaskUpdate.tsx", ":p")) | buffer /mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/\[orgID]/project/\[projectId]/TaskUpdate.tsx | else | edit /mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/\[orgID]/project/\[projectId]/TaskUpdate.tsx | endif
if &buftype ==# 'terminal'
  silent file /mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/\[orgID]/project/\[projectId]/TaskUpdate.tsx
endif
balt /mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/_components/FileKits/index.tsx
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
let s:l = 131 - ((20 * winheight(0) + 15) / 30)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 131
normal! 053|
wincmd w
argglobal
if bufexists(fnamemodify("/mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/\[orgID]/project/\[projectId]/ProjectNav.tsx", ":p")) | buffer /mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/\[orgID]/project/\[projectId]/ProjectNav.tsx | else | edit /mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/\[orgID]/project/\[projectId]/ProjectNav.tsx | endif
if &buftype ==# 'terminal'
  silent file /mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/\[orgID]/project/\[projectId]/ProjectNav.tsx
endif
balt /mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/\[orgID]/project/\[projectId]/TaskUpdate.tsx
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
let s:l = 140 - ((50 * winheight(0) + 32) / 64)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 140
normal! 08|
wincmd w
exe '1resize ' . ((&lines * 16 + 33) / 67)
exe 'vert 1resize ' . ((&columns * 60 + 120) / 240)
exe '2resize ' . ((&lines * 16 + 33) / 67)
exe 'vert 2resize ' . ((&columns * 59 + 120) / 240)
exe '3resize ' . ((&lines * 16 + 33) / 67)
exe 'vert 3resize ' . ((&columns * 120 + 120) / 240)
exe '4resize ' . ((&lines * 33 + 33) / 67)
exe 'vert 4resize ' . ((&columns * 59 + 120) / 240)
exe '5resize ' . ((&lines * 30 + 33) / 67)
exe 'vert 5resize ' . ((&columns * 180 + 120) / 240)
exe 'vert 6resize ' . ((&columns * 59 + 120) / 240)
tabnext 2
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
