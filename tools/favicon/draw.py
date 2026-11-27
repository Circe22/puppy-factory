# 2026-11-28 字字兽小图标 •ᴥ•：拾定的版本（眼距+20%、鼻头上移、ᴥ 加粗横拉 20%）。
# 需要 pu1.ttf：用 fontTools 把 dist/puppy-unicode-1.woff 转成 ttf。跑法：uv run --with pillow python draw.py
from PIL import Image, ImageDraw
import sys
BG=(248,214,216); FG=(94,74,67); W=1024
def make(path, pad=True):
    im=Image.new('RGBA',(W,W),(0,0,0,0)); d=ImageDraw.Draw(im)
    d.rounded_rectangle([0,0,W-1,W-1],radius=W*0.3,fill=BG)
    r=W*0.09; ey=W*0.43
    for ex in (W*0.272,W*0.728):
        d.ellipse([ex-r,ey-r,ex+r,ey+r],fill=FG)
    from PIL import ImageFont
    f=ImageFont.truetype('pu1.ttf',int(W*0.40)); sw=int(W*0.016)
    g=Image.new('RGBA',(W,W),(0,0,0,0)); gd=ImageDraw.Draw(g)
    gd.text((W/2,W/2),'\u1d25',font=f,fill=FG,anchor='mm',stroke_width=sw,stroke_fill=FG)
    g=g.crop(g.getbbox()); gw,gh=g.size
    g=g.resize((int(gw*1.2),gh),Image.LANCZOS); gw,gh=g.size
    im.alpha_composite(g,(int(W/2-gw/2),int(W*0.60-gh/2)))
    im.save(path)
    return im
big=make('icon-1024.png')
for s in (512,192,180,48,32,16):
    big.resize((s,s),Image.LANCZOS).save(f'icon-{s}.png')
big.resize((48,48),Image.LANCZOS).save('favicon.ico',sizes=[(16,16),(32,32),(48,48)])

sheet=Image.new('RGB',(700,260),(255,255,255))
dk=Image.new('RGB',(700,60),(40,40,46)); sheet.paste(dk,(0,200))
x=20
for s in (16,32,48):
    sm=Image.open(f'icon-{s}.png'); sheet.paste(sm,(x,20),sm); sheet.paste(sm,(x,210),sm); x+=s+24
big=Image.open('icon-180.png'); sheet.paste(big,(200,10),big)
up=Image.open('icon-16.png').resize((128,128),Image.NEAREST); sheet.paste(up,(420,30),up)
up=Image.open('icon-32.png').resize((128,128),Image.NEAREST); sheet.paste(up,(560,30),up)
sheet.save('preview.png')
