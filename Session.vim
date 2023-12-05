let SessionLoad = 1
let s:so_save = &g:so | let s:siso_save = &g:siso | setg so=0 siso=0 | setl so=-1 siso=-1
let v:this_session=expand("<sfile>:p")
silent only
silent tabonly
cd /mnt/Data/code/fullstack/kampuni-area/activity@v1
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
let s:shortmess_save = &shortmess
if &shortmess =~ 'A'
  set shortmess=aoOA
else
  set shortmess=aoO
endif
badd +1 packages/shared-models/src/prisma/schema.prisma
badd +1 ./packages//ui-app//app//_features//Activity//ActivityCardAttach.tsx
badd +70 ./packages//ui-app//app//_features//Activity//ActivityCardComment.tsx
badd +24 ./packages//ui-app//app//_features//Activity//ActivityCommentEditor.tsx
badd +18 ./packages//ui-app//app//_features//Activity//ActivityCreatorAvatar.tsx
badd +9 ./packages//ui-app//app//_features//Activity//ActivityMemberRepresent.tsx
badd +132 ./packages//ui-app//app//_features//Activity//context.tsx
badd +29 packages/shared-models/src/type.ts
badd +25 packages/ui-app/app/_features/Activity/ActivityCardCommentContent.tsx
badd +22 /mnt/Data/code/fullstack/kampuni-area/activity@v1/packages/be-gateway/src/routes/activity/index.ts
badd +16 /mnt/Data/code/fullstack/kampuni-area/activity@v1/packages/be-gateway/src/routes/example/index.ts
badd +29 /mnt/Data/code/fullstack/kampuni-area/activity@v1/packages/be-gateway/src/main.ts
badd +61 packages/be-gateway/src/routes/test2.ts
badd +7 packages/be-gateway/src/core/index.ts
badd +9 packages/be-gateway/src/core/Controller.ts
badd +10 packages/be-gateway/src/core/methods/Get.ts
badd +23 /mnt/Data/code/fullstack/kampuni-area/activity@v1/packages/be-gateway/src/routes/index.ts
badd +44 /mnt/Data/code/fullstack/kampuni-area/activity@v1/packages/be-gateway/src/core/AppRoutes.ts
badd +17 packages/ui-app/services/activity.ts
badd +14 packages/be-gateway/src/core/Mapper.ts
badd +2 packages/shared-ui/src/components/Controls/TextEditorControl/index.tsx
badd +1 .env
badd +3 packages/be-gateway/src/lib/jwt.ts
badd +1 packages/be-gateway/src/routes/auth/index.ts
badd +36 packages/goalie-nextjs/src/services/auth.ts
badd +11 packages/ui-app/app/_features/Activity/index.tsx
badd +12 packages/ui-app/app/_features/Activity/ActivityContainer.tsx
badd +11 packages/shared-ui/src/components/Controls/ListControl/ListOptions.tsx
badd +5 packages/shared-ui/src/components/Controls/ListControl/index.tsx
badd +89 packages/ui-app/app/_components/PointSelect.tsx
badd +44 packages/shared-ui/src/components/Controls/type.ts
badd +11 packages/shared-ui/src/components/Controls/index.tsx
badd +0 packages/ui-app/app/_features/Activity/ActivityList.tsx
argglobal
%argdel
tabnew +setlocal\ bufhidden=wipe
tabnew +setlocal\ bufhidden=wipe
tabnew +setlocal\ bufhidden=wipe
tabrewind
edit packages/shared-models/src/prisma/schema.prisma
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
wincmd _ | wincmd |
vsplit
1wincmd h
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
exe 'vert 1resize ' . ((&columns * 120 + 120) / 240)
exe 'vert 2resize ' . ((&columns * 119 + 120) / 240)
argglobal
balt ./packages//ui-app//app//_features//Activity//context.tsx
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
let s:l = 318 - ((51 * winheight(0) + 28) / 56)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 318
normal! 027|
wincmd w
argglobal
if bufexists(fnamemodify("packages/shared-models/src/type.ts", ":p")) | buffer packages/shared-models/src/type.ts | else | edit packages/shared-models/src/type.ts | endif
if &buftype ==# 'terminal'
  silent file packages/shared-models/src/type.ts
endif
balt packages/shared-models/src/prisma/schema.prisma
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
let s:l = 15 - ((14 * winheight(0) + 28) / 56)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 15
normal! 0
wincmd w
exe 'vert 1resize ' . ((&columns * 120 + 120) / 240)
exe 'vert 2resize ' . ((&columns * 119 + 120) / 240)
tabnext
edit packages/ui-app/app/_features/Activity/ActivityCardCommentContent.tsx
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
wincmd _ | wincmd |
split
1wincmd k
wincmd _ | wincmd |
vsplit
wincmd _ | wincmd |
vsplit
2wincmd h
wincmd w
wincmd w
wincmd w
wincmd _ | wincmd |
vsplit
1wincmd h
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
exe '1resize ' . ((&lines * 28 + 30) / 60)
exe 'vert 1resize ' . ((&columns * 79 + 120) / 240)
exe '2resize ' . ((&lines * 28 + 30) / 60)
exe 'vert 2resize ' . ((&columns * 80 + 120) / 240)
exe '3resize ' . ((&lines * 28 + 30) / 60)
exe 'vert 3resize ' . ((&columns * 79 + 120) / 240)
exe '4resize ' . ((&lines * 28 + 30) / 60)
exe 'vert 4resize ' . ((&columns * 145 + 120) / 240)
exe '5resize ' . ((&lines * 28 + 30) / 60)
exe 'vert 5resize ' . ((&columns * 94 + 120) / 240)
argglobal
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
let s:l = 43 - ((19 * winheight(0) + 13) / 27)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 43
normal! 021|
wincmd w
argglobal
if bufexists(fnamemodify("./packages//ui-app//app//_features//Activity//ActivityCardComment.tsx", ":p")) | buffer ./packages//ui-app//app//_features//Activity//ActivityCardComment.tsx | else | edit ./packages//ui-app//app//_features//Activity//ActivityCardComment.tsx | endif
if &buftype ==# 'terminal'
  silent file ./packages//ui-app//app//_features//Activity//ActivityCardComment.tsx
endif
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
let s:l = 71 - ((15 * winheight(0) + 13) / 27)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 71
normal! 039|
wincmd w
argglobal
if bufexists(fnamemodify("packages/ui-app/app/_features/Activity/ActivityList.tsx", ":p")) | buffer packages/ui-app/app/_features/Activity/ActivityList.tsx | else | edit packages/ui-app/app/_features/Activity/ActivityList.tsx | endif
if &buftype ==# 'terminal'
  silent file packages/ui-app/app/_features/Activity/ActivityList.tsx
endif
balt packages/ui-app/app/_features/Activity/ActivityContainer.tsx
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
let s:l = 25 - ((16 * winheight(0) + 13) / 27)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 25
normal! 09|
wincmd w
argglobal
if bufexists(fnamemodify("./packages//ui-app//app//_features//Activity//context.tsx", ":p")) | buffer ./packages//ui-app//app//_features//Activity//context.tsx | else | edit ./packages//ui-app//app//_features//Activity//context.tsx | endif
if &buftype ==# 'terminal'
  silent file ./packages//ui-app//app//_features//Activity//context.tsx
endif
balt packages/ui-app/app/_features/Activity/ActivityCardCommentContent.tsx
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
let s:l = 24 - ((16 * winheight(0) + 13) / 27)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 24
normal! 0
wincmd w
argglobal
if bufexists(fnamemodify("./packages//ui-app//app//_features//Activity//ActivityCommentEditor.tsx", ":p")) | buffer ./packages//ui-app//app//_features//Activity//ActivityCommentEditor.tsx | else | edit ./packages//ui-app//app//_features//Activity//ActivityCommentEditor.tsx | endif
if &buftype ==# 'terminal'
  silent file ./packages//ui-app//app//_features//Activity//ActivityCommentEditor.tsx
endif
balt ./packages//ui-app//app//_features//Activity//ActivityCardComment.tsx
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
let s:l = 19 - ((10 * winheight(0) + 13) / 27)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 19
normal! 022|
wincmd w
2wincmd w
exe '1resize ' . ((&lines * 28 + 30) / 60)
exe 'vert 1resize ' . ((&columns * 79 + 120) / 240)
exe '2resize ' . ((&lines * 28 + 30) / 60)
exe 'vert 2resize ' . ((&columns * 80 + 120) / 240)
exe '3resize ' . ((&lines * 28 + 30) / 60)
exe 'vert 3resize ' . ((&columns * 79 + 120) / 240)
exe '4resize ' . ((&lines * 28 + 30) / 60)
exe 'vert 4resize ' . ((&columns * 145 + 120) / 240)
exe '5resize ' . ((&lines * 28 + 30) / 60)
exe 'vert 5resize ' . ((&columns * 94 + 120) / 240)
tabnext
edit /mnt/Data/code/fullstack/kampuni-area/activity@v1/packages/be-gateway/src/routes/activity/index.ts
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd w
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
exe 'vert 1resize ' . ((&columns * 30 + 120) / 240)
exe '2resize ' . ((&lines * 28 + 30) / 60)
exe 'vert 2resize ' . ((&columns * 104 + 120) / 240)
exe '3resize ' . ((&lines * 28 + 30) / 60)
exe 'vert 3resize ' . ((&columns * 104 + 120) / 240)
exe '4resize ' . ((&lines * 28 + 30) / 60)
exe 'vert 4resize ' . ((&columns * 104 + 120) / 240)
exe '5resize ' . ((&lines * 28 + 30) / 60)
exe 'vert 5resize ' . ((&columns * 104 + 120) / 240)
argglobal
enew
file NvimTree_3
balt /mnt/Data/code/fullstack/kampuni-area/activity@v1/packages/be-gateway/src/routes/activity/index.ts
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
balt /mnt/Data/code/fullstack/kampuni-area/activity@v1/packages/be-gateway/src/routes/index.ts
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
let s:l = 59 - ((12 * winheight(0) + 13) / 27)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 59
normal! 0
wincmd w
argglobal
if bufexists(fnamemodify("packages/ui-app/services/activity.ts", ":p")) | buffer packages/ui-app/services/activity.ts | else | edit packages/ui-app/services/activity.ts | endif
if &buftype ==# 'terminal'
  silent file packages/ui-app/services/activity.ts
endif
balt /mnt/Data/code/fullstack/kampuni-area/activity@v1/packages/be-gateway/src/routes/activity/index.ts
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
let s:l = 15 - ((12 * winheight(0) + 13) / 27)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 15
normal! 029|
wincmd w
argglobal
if bufexists(fnamemodify("packages/be-gateway/src/routes/test2.ts", ":p")) | buffer packages/be-gateway/src/routes/test2.ts | else | edit packages/be-gateway/src/routes/test2.ts | endif
if &buftype ==# 'terminal'
  silent file packages/be-gateway/src/routes/test2.ts
endif
balt /mnt/Data/code/fullstack/kampuni-area/activity@v1/packages/be-gateway/src/main.ts
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
let s:l = 36 - ((10 * winheight(0) + 13) / 27)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 36
normal! 0
wincmd w
argglobal
if bufexists(fnamemodify("packages/be-gateway/src/core/methods/Get.ts", ":p")) | buffer packages/be-gateway/src/core/methods/Get.ts | else | edit packages/be-gateway/src/core/methods/Get.ts | endif
if &buftype ==# 'terminal'
  silent file packages/be-gateway/src/core/methods/Get.ts
endif
balt /mnt/Data/code/fullstack/kampuni-area/activity@v1/packages/be-gateway/src/core/AppRoutes.ts
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
let s:l = 14 - ((13 * winheight(0) + 13) / 27)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 14
normal! 0
wincmd w
exe 'vert 1resize ' . ((&columns * 30 + 120) / 240)
exe '2resize ' . ((&lines * 28 + 30) / 60)
exe 'vert 2resize ' . ((&columns * 104 + 120) / 240)
exe '3resize ' . ((&lines * 28 + 30) / 60)
exe 'vert 3resize ' . ((&columns * 104 + 120) / 240)
exe '4resize ' . ((&lines * 28 + 30) / 60)
exe 'vert 4resize ' . ((&columns * 104 + 120) / 240)
exe '5resize ' . ((&lines * 28 + 30) / 60)
exe 'vert 5resize ' . ((&columns * 104 + 120) / 240)
tabnext
edit packages/be-gateway/src/routes/auth/index.ts
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
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
exe '1resize ' . ((&lines * 28 + 30) / 60)
exe '2resize ' . ((&lines * 28 + 30) / 60)
argglobal
balt packages/be-gateway/src/lib/jwt.ts
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
let s:l = 75 - ((17 * winheight(0) + 14) / 28)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 75
normal! 02|
wincmd w
argglobal
if bufexists(fnamemodify("packages/goalie-nextjs/src/services/auth.ts", ":p")) | buffer packages/goalie-nextjs/src/services/auth.ts | else | edit packages/goalie-nextjs/src/services/auth.ts | endif
if &buftype ==# 'terminal'
  silent file packages/goalie-nextjs/src/services/auth.ts
endif
balt .env
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
let s:l = 36 - ((10 * winheight(0) + 14) / 28)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 36
normal! 05|
wincmd w
exe '1resize ' . ((&lines * 28 + 30) / 60)
exe '2resize ' . ((&lines * 28 + 30) / 60)
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
